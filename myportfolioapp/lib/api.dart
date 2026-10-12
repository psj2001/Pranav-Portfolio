import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import 'models.dart';

class ApiException implements Exception {
  ApiException(this.message, {this.unauthorized = false});

  final String message;
  final bool unauthorized;

  @override
  String toString() => message;
}

class PortfolioApi {
  static const baseUrl = 'https://pranavps.com/api';
  static const _tokenKey = 'portfolio_token';

  Future<String?> readToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_tokenKey);
  }

  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  Future<void> clearToken() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
  }

  Future<void> login(String password) async {
    final response = await http.post(
      Uri.parse('$baseUrl/login.php'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'password': password}),
    );
    final data = _decode(response);
    final token = data['token'];
    if (token is! String || token.isEmpty) {
      throw ApiException('Sign in failed.');
    }
    await saveToken(token);
  }

  Future<List<ExperienceItem>> experiences() async {
    final data = await _send('GET', '/experiences.php');
    final items = data['experiences'];
    if (items is! List) return [];
    return items.whereType<Map>().map((item) => ExperienceItem.fromJson(Map<String, dynamic>.from(item))).toList();
  }

  Future<List<ProjectItem>> projects() async {
    final data = await _send('GET', '/projects.php');
    final items = data['projects'];
    if (items is! List) return [];
    return items.whereType<Map>().map((item) => ProjectItem.fromJson(Map<String, dynamic>.from(item))).toList();
  }

  Future<void> saveExperience(ExperienceItem item) {
    return _send('POST', '/experiences.php', {'action': 'save', 'item': item.toJson()});
  }

  Future<void> deleteExperience(String id) {
    return _send('POST', '/experiences.php', {'action': 'delete', 'id': id});
  }

  Future<void> saveProject(ProjectItem item) {
    return _send('POST', '/projects.php', {'action': 'save', 'item': item.toJson()});
  }

  Future<ProjectShot> uploadProjectImage({
    required String projectId,
    required String filePath,
    required String alt,
  }) async {
    final token = await readToken();
    if (token == null || token.isEmpty) {
      throw ApiException('Sign in again.', unauthorized: true);
    }
    final request = http.MultipartRequest('POST', Uri.parse('$baseUrl/upload.php'));
    request.headers['Authorization'] = 'Bearer $token';
    request.headers['X-Portfolio-Token'] = token;
    request.fields['id'] = projectId;
    if (alt.isNotEmpty) request.fields['alt'] = alt;
    request.files.add(await http.MultipartFile.fromPath('image', filePath));
    final streamed = await request.send().timeout(const Duration(seconds: 60));
    final response = await http.Response.fromStream(streamed);
    final data = _decode(response, upload: true);
    final src = data['src'];
    if (src is! String || src.isEmpty) {
      throw ApiException('The image did not upload.');
    }
    return ProjectShot(
      src: src,
      alt: data['alt'] as String? ?? alt,
      width: (data['width'] as num?)?.toInt() ?? 0,
      height: (data['height'] as num?)?.toInt() ?? 0,
    );
  }

  Future<BlogBlock> uploadPostImage({
    required String track,
    required String slug,
    required String filePath,
    required String alt,
  }) async {
    final token = await readToken();
    if (token == null || token.isEmpty) {
      throw ApiException('Sign in again.', unauthorized: true);
    }
    final request = http.MultipartRequest('POST', Uri.parse('$baseUrl/upload.php'));
    request.headers['Authorization'] = 'Bearer $token';
    request.headers['X-Portfolio-Token'] = token;
    request.fields['kind'] = 'post';
    request.fields['track'] = track;
    request.fields['id'] = slug;
    if (alt.isNotEmpty) request.fields['alt'] = alt;
    request.files.add(await http.MultipartFile.fromPath('image', filePath));
    final streamed = await request.send().timeout(const Duration(seconds: 60));
    final response = await http.Response.fromStream(streamed);
    final data = _decode(response, upload: true);
    final src = data['src'];
    if (src is! String || src.isEmpty) {
      throw ApiException('The image did not upload.');
    }
    return BlogBlock.image(
      src: src,
      alt: data['alt'] as String? ?? alt,
      width: (data['width'] as num?)?.toInt() ?? 0,
      height: (data['height'] as num?)?.toInt() ?? 0,
    );
  }

  Future<void> deleteProject(String id) {
    return _send('POST', '/projects.php', {'action': 'delete', 'id': id});
  }

  Future<List<BlogPostItem>> posts() async {
    final data = await _send('GET', '/posts.php');
    final items = data['posts'];
    if (items is! List) return [];
    return items.whereType<Map>().map((item) => BlogPostItem.fromJson(Map<String, dynamic>.from(item))).toList();
  }

  Future<void> savePost(BlogPostItem item, {String? previousTrack, String? previousSlug}) {
    return _send('POST', '/posts.php', {
      'action': 'save',
      'item': item.toJson(),
      if (previousTrack != null && previousSlug != null) 'previous': {'track': previousTrack, 'slug': previousSlug},
    });
  }

  Future<void> deletePost({required String track, required String slug}) {
    return _send('POST', '/posts.php', {'action': 'delete', 'track': track, 'slug': slug});
  }

  Future<Map<String, dynamic>> _send(String method, String path, [Map<String, dynamic>? body]) async {
    final token = await readToken();
    if (token == null || token.isEmpty) {
      throw ApiException('Sign in again.', unauthorized: true);
    }
    final headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $token',
      'X-Portfolio-Token': token,
    };
    final uri = Uri.parse('$baseUrl$path');
    final response = method == 'GET'
        ? await http.get(uri, headers: headers)
        : await http.post(uri, headers: headers, body: jsonEncode(body ?? {}));
    return _decode(response);
  }

  Map<String, dynamic> _decode(http.Response response, {bool upload = false}) {
    Map<String, dynamic> data = {};
    final body = response.body.trim();
    if (body.isNotEmpty) {
      if (!body.startsWith('{') && !body.startsWith('[')) {
        throw ApiException(
          upload
              ? 'Image upload is not on pranavps.com yet. Add upload.php next to projects.php, then try again.'
              : 'The server could not save that.',
        );
      }
      try {
        final decoded = jsonDecode(body);
        if (decoded is Map) data = Map<String, dynamic>.from(decoded);
      } on FormatException {
        throw ApiException(upload ? 'The image did not upload.' : 'The server could not save that.');
      }
    }
    if (response.statusCode == 401) {
      throw ApiException(data['error'] as String? ?? 'Sign in again.', unauthorized: true);
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw ApiException(data['error'] as String? ?? 'The server could not save that.');
    }
    return data;
  }
}
