import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';

import 'api.dart';
import 'models.dart';

void main() {
  runApp(const PortfolioEditorApp());
}

class PortfolioEditorApp extends StatelessWidget {
  const PortfolioEditorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Portfolio editor',
      theme: ThemeData(
        brightness: Brightness.dark,
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF00E5E5), brightness: Brightness.dark),
        useMaterial3: true,
      ),
      home: const GatePage(),
    );
  }
}

class GatePage extends StatefulWidget {
  const GatePage({super.key});

  @override
  State<GatePage> createState() => _GatePageState();
}

class _GatePageState extends State<GatePage> {
  final _api = PortfolioApi();
  late final Future<bool> _session = _api.readToken().then((token) => token != null && token.isNotEmpty);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<bool>(
      future: _session,
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Scaffold(body: Center(child: CircularProgressIndicator()));
        }
        return snapshot.data! ? EditorHome(api: _api) : LoginPage(api: _api);
      },
    );
  }
}

class LoginPage extends StatefulWidget {
  const LoginPage({super.key, required this.api});

  final PortfolioApi api;

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _password = TextEditingController();
  var _busy = false;
  String? _error;

  @override
  void dispose() {
    _password.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      await widget.api.login(_password.text);
      if (!mounted) return;
      Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => EditorHome(api: widget.api)));
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    } catch (_) {
      setState(() => _error = 'Could not reach pranavps.com.');
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(24),
          children: [
            const SizedBox(height: 48),
            Text('Portfolio editor', style: Theme.of(context).textTheme.headlineMedium),
            const SizedBox(height: 8),
            const Text('Sign in to edit work, projects, and the blog on pranavps.com.'),
            const SizedBox(height: 24),
            TextField(
              controller: _password,
              obscureText: true,
              decoration: const InputDecoration(labelText: 'Password', border: OutlineInputBorder()),
              onSubmitted: (_) => _submit(),
            ),
            if (_error != null) ...[
              const SizedBox(height: 12),
              Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
            ],
            const SizedBox(height: 16),
            FilledButton(
              onPressed: _busy ? null : _submit,
              child: Text(_busy ? 'Signing in…' : 'Sign in'),
            ),
          ],
        ),
      ),
    );
  }
}

class EditorHome extends StatefulWidget {
  const EditorHome({super.key, required this.api});

  final PortfolioApi api;

  @override
  State<EditorHome> createState() => _EditorHomeState();
}

class _EditorHomeState extends State<EditorHome> {
  var _section = 0;
  var _loading = true;
  String? _error;
  String? _postsError;
  List<ExperienceItem> _jobs = [];
  List<ProjectItem> _projects = [];
  List<BlogPostItem> _posts = [];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final jobs = await widget.api.experiences();
      final projects = await widget.api.projects();
      List<BlogPostItem> posts = [];
      String? postsError;
      try {
        posts = await widget.api.posts();
      } on ApiException catch (error) {
        if (error.unauthorized) rethrow;
        postsError = error.message;
      }
      if (!mounted) return;
      setState(() {
        _jobs = jobs;
        _projects = projects;
        _posts = posts;
        _postsError = postsError;
      });
    } on ApiException catch (error) {
      if (error.unauthorized) {
        await widget.api.clearToken();
        if (!mounted) return;
        Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => LoginPage(api: widget.api)));
        return;
      }
      setState(() => _error = error.message);
    } catch (_) {
      setState(() => _error = 'Could not load the portfolio.');
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  Future<void> _signOut() async {
    await widget.api.clearToken();
    if (!mounted) return;
    Navigator.of(context).pushReplacement(MaterialPageRoute(builder: (_) => LoginPage(api: widget.api)));
  }

  String get _title {
    if (_section == 0) return 'Work';
    if (_section == 1) return 'Projects';
    return 'Blog';
  }

  List<Widget> get _tiles {
    if (_section == 0) {
      return _jobs
          .map(
            (job) => ListTile(
              title: Text(job.company),
              subtitle: Text(job.role),
              onTap: () => _openExperience(job),
            ),
          )
          .toList();
    }
    if (_section == 1) {
      return _projects
          .map(
            (project) => ListTile(
              title: Text(project.title),
              subtitle: Text(project.status == 'public' ? 'Public' : 'Hidden'),
              onTap: () => _openProject(project),
            ),
          )
          .toList();
    }
    return [
      if (_postsError != null) ListTile(title: Text(_postsError!)),
      if (_posts.isEmpty && _postsError == null) const ListTile(title: Text('No posts yet')),
      ..._posts.map(
        (post) => ListTile(
          title: Text(post.title),
          subtitle: Text('${post.track == 'marketing' ? 'Digital marketing' : 'Software'} · ${post.status == 'public' ? 'Public' : 'Hidden'}'),
          onTap: () => _openPost(post),
        ),
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(_title),
        actions: [IconButton(onPressed: _signOut, icon: const Icon(Icons.logout), tooltip: 'Sign out')],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : RefreshIndicator(
                  onRefresh: _load,
                  child: ListView(children: _tiles),
                ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          if (_section == 0) {
            _openExperience(null);
          } else if (_section == 1) {
            _openProject(null);
          } else {
            _openPost(null);
          }
        },
        child: const Icon(Icons.add),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _section,
        onDestinationSelected: (index) => setState(() => _section = index),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.work_outline), label: 'Work'),
          NavigationDestination(icon: Icon(Icons.folder_outlined), label: 'Projects'),
          NavigationDestination(icon: Icon(Icons.article_outlined), label: 'Blog'),
        ],
      ),
    );
  }

  Future<void> _openExperience(ExperienceItem? job) async {
    final saved = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => ExperienceEditor(api: widget.api, existing: job)),
    );
    if (saved == true) _load();
  }

  Future<void> _openProject(ProjectItem? project) async {
    final saved = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => ProjectEditor(api: widget.api, existing: project)),
    );
    if (saved == true) _load();
  }

  Future<void> _openPost(BlogPostItem? post) async {
    final saved = await Navigator.of(context).push<bool>(
      MaterialPageRoute(builder: (_) => BlogEditor(api: widget.api, existing: post)),
    );
    if (saved == true) _load();
  }
}

class ExperienceEditor extends StatefulWidget {
  const ExperienceEditor({super.key, required this.api, this.existing});

  final PortfolioApi api;
  final ExperienceItem? existing;

  @override
  State<ExperienceEditor> createState() => _ExperienceEditorState();
}

class _ExperienceEditorState extends State<ExperienceEditor> {
  late final TextEditingController _id;
  late final TextEditingController _role;
  late final TextEditingController _company;
  late final TextEditingController _location;
  late final TextEditingController _startYear;
  late final TextEditingController _startMonth;
  late final TextEditingController _endYear;
  late final TextEditingController _endMonth;
  late final TextEditingController _bullets;
  late final TextEditingController _related;
  late final TextEditingController _technologies;
  late final TextEditingController _projectIds;
  var _hasEnd = false;
  var _busy = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    final job = widget.existing;
    _id = TextEditingController(text: job?.id ?? '');
    _role = TextEditingController(text: job?.role ?? '');
    _company = TextEditingController(text: job?.company ?? '');
    _location = TextEditingController(text: job?.location ?? '');
    _startYear = TextEditingController(text: '${job?.start.year ?? DateTime.now().year}');
    _startMonth = TextEditingController(text: '${job?.start.month ?? 1}');
    _endYear = TextEditingController(text: job?.end == null ? '' : '${job!.end!.year}');
    _endMonth = TextEditingController(text: job?.end == null ? '' : '${job!.end!.month}');
    _bullets = TextEditingController(text: listToLines(job?.bullets ?? []));
    _related = TextEditingController(text: listToLines(job?.related ?? []));
    _technologies = TextEditingController(text: listToLines(job?.technologies ?? []));
    _projectIds = TextEditingController(text: listToLines(job?.projectIds ?? []));
    _hasEnd = job?.end != null;
  }

  @override
  void dispose() {
    for (final controller in [_id, _role, _company, _location, _startYear, _startMonth, _endYear, _endMonth, _bullets, _related, _technologies, _projectIds]) {
      controller.dispose();
    }
    super.dispose();
  }

  Future<void> _save() async {
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final item = ExperienceItem(
        id: _id.text.trim(),
        role: _role.text.trim(),
        company: _company.text.trim(),
        location: _location.text.trim(),
        start: MonthPoint(year: int.parse(_startYear.text.trim()), month: int.parse(_startMonth.text.trim())),
        end: _hasEnd ? MonthPoint(year: int.parse(_endYear.text.trim()), month: int.parse(_endMonth.text.trim())) : null,
        bullets: linesToList(_bullets.text),
        related: linesToList(_related.text),
        technologies: linesToList(_technologies.text),
        projectIds: linesToList(_projectIds.text),
      );
      await widget.api.saveExperience(item);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on FormatException {
      setState(() => _error = 'Enter the month and year as numbers.');
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    } catch (_) {
      setState(() => _error = 'Could not save this job.');
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _delete() async {
    final job = widget.existing;
    if (job == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete this job?'),
        content: Text(job.company),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Delete')),
        ],
      ),
    );
    if (confirmed != true) return;
    try {
      await widget.api.deleteExperience(job.id);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.existing == null ? 'New job' : 'Edit job')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _field(_id, 'Id', enabled: widget.existing == null),
          _field(_role, 'Role'),
          _field(_company, 'Company'),
          _field(_location, 'Location'),
          Row(children: [
            Expanded(child: _field(_startMonth, 'Start month')),
            const SizedBox(width: 12),
            Expanded(child: _field(_startYear, 'Start year')),
          ]),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: const Text('End date is confirmed'),
            value: _hasEnd,
            onChanged: (value) => setState(() => _hasEnd = value),
          ),
          if (_hasEnd)
            Row(children: [
              Expanded(child: _field(_endMonth, 'End month')),
              const SizedBox(width: 12),
              Expanded(child: _field(_endYear, 'End year')),
            ]),
          _field(_bullets, 'Bullets, one per line', lines: 5),
          _field(_related, 'Related notes, one per line', lines: 3),
          _field(_technologies, 'Technologies, one per line', lines: 3),
          _field(_projectIds, 'Project ids, one per line', lines: 3),
          if (_error != null) Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
          const SizedBox(height: 12),
          FilledButton(onPressed: _busy ? null : _save, child: Text(_busy ? 'Saving…' : 'Save')),
          if (widget.existing != null) TextButton(onPressed: _busy ? null : _delete, child: const Text('Delete')),
        ],
      ),
    );
  }
}

class ProjectEditor extends StatefulWidget {
  const ProjectEditor({super.key, required this.api, this.existing});

  final PortfolioApi api;
  final ProjectItem? existing;

  @override
  State<ProjectEditor> createState() => _ProjectEditorState();
}

class _ProjectEditorState extends State<ProjectEditor> {
  late final TextEditingController _id;
  late final TextEditingController _title;
  late final TextEditingController _summary;
  late final TextEditingController _contribution;
  late final TextEditingController _technologies;
  late final TextEditingController _tasks;
  late final TextEditingController _completed;
  late final TextEditingController _links;
  late final TextEditingController _experienceId;
  late final TextEditingController _alsoTypes;
  late final TextEditingController _audiences;
  late String _status;
  late String _productType;
  String? _engagement;
  String? _contributionKind;
  ProjectShot? _shot;
  String? _localPath;
  var _featured = false;
  var _busy = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    final project = widget.existing;
    _id = TextEditingController(text: project?.id ?? '');
    _title = TextEditingController(text: project?.title ?? '');
    _summary = TextEditingController(text: project?.summary ?? '');
    _contribution = TextEditingController(text: project?.contribution ?? '');
    _technologies = TextEditingController(text: listToLines(project?.technologies ?? []));
    _tasks = TextEditingController(text: listToLines(project?.tasks ?? []));
    _completed = TextEditingController(text: project?.completed ?? '');
    _links = TextEditingController(
      text: (project?.links ?? []).map((link) => '${link.label} | ${link.href}').join('\n'),
    );
    _experienceId = TextEditingController(text: project?.experienceId ?? '');
    _alsoTypes = TextEditingController(text: listToLines(project?.alsoTypes ?? []));
    _audiences = TextEditingController(text: listToLines(project?.audiences ?? []));
    _status = project?.status ?? 'public';
    _productType = project?.productType ?? 'mobile-app';
    _engagement = project?.engagement;
    _contributionKind = project?.contributionKind;
    final shot = project?.screenshot;
    _shot = shot != null && shot.src.isNotEmpty ? shot : null;
    _featured = project?.featured ?? false;
  }

  @override
  void dispose() {
    for (final controller in [_id, _title, _summary, _contribution, _technologies, _tasks, _completed, _links, _experienceId, _alsoTypes, _audiences]) {
      controller.dispose();
    }
    super.dispose();
  }

  List<ProjectLink> _parseLinks() {
    return linesToList(_links.text).map((line) {
      final parts = line.split('|');
      return ProjectLink(
        label: parts.first.trim(),
        href: parts.length > 1 ? parts.sublist(1).join('|').trim() : '',
      );
    }).where((link) => link.label.isNotEmpty && link.href.isNotEmpty).toList();
  }

  Future<void> _pickImage() async {
    final source = await showModalBottomSheet<ImageSource>(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.photo_library_outlined),
              title: const Text('Photo library'),
              onTap: () => Navigator.pop(context, ImageSource.gallery),
            ),
            ListTile(
              leading: const Icon(Icons.photo_camera_outlined),
              title: const Text('Camera'),
              onTap: () => Navigator.pop(context, ImageSource.camera),
            ),
          ],
        ),
      ),
    );
    if (source == null) return;
    try {
      final file = await ImagePicker().pickImage(source: source, maxWidth: 2000, imageQuality: 85);
      if (file == null || !mounted) return;
      setState(() {
        _localPath = file.path;
        _error = null;
      });
    } on PlatformException {
      if (!mounted) return;
      setState(() => _error = 'Allow photo access to add an image.');
    }
  }

  void _clearImage() {
    setState(() {
      _localPath = null;
      _shot = null;
    });
  }

  Future<void> _save() async {
    if (_localPath != null && _id.text.trim().isEmpty) {
      setState(() => _error = 'Enter an id before adding an image.');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      if (_localPath != null) {
        _shot = await widget.api.uploadProjectImage(
          projectId: _id.text.trim(),
          filePath: _localPath!,
          alt: _title.text.trim(),
        );
        _localPath = null;
      }
      final shot = _shot;
      final item = ProjectItem(
        id: _id.text.trim(),
        status: _status,
        title: _title.text.trim(),
        summary: _summary.text.trim(),
        productType: _productType,
        engagement: _engagement,
        contributionKind: _contributionKind,
        contribution: _contribution.text.trim(),
        technologies: linesToList(_technologies.text),
        tasks: linesToList(_tasks.text),
        completed: _completed.text.trim(),
        links: _parseLinks(),
        screenshot: shot == null || shot.src.isEmpty
            ? null
            : ProjectShot(
                src: shot.src,
                alt: _title.text.trim().isEmpty ? 'Project screenshot' : _title.text.trim(),
                width: shot.width,
                height: shot.height,
              ),
        featured: _featured,
        experienceId: _experienceId.text.trim(),
        alsoTypes: linesToList(_alsoTypes.text),
        audiences: linesToList(_audiences.text),
      );
      await widget.api.saveProject(item);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    } catch (_) {
      setState(() => _error = 'Could not save this project.');
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _delete() async {
    final project = widget.existing;
    if (project == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete this project?'),
        content: Text(project.title),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Delete')),
        ],
      ),
    );
    if (confirmed != true) return;
    try {
      await widget.api.deleteProject(project.id);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.existing == null ? 'New project' : 'Edit project')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _field(_id, 'Id', enabled: widget.existing == null),
          _field(_title, 'Title'),
          _field(_summary, 'Summary', lines: 3),
          _imageField(),
          DropdownButtonFormField<String>(
            initialValue: _status,
            decoration: const InputDecoration(labelText: 'Visibility', border: OutlineInputBorder()),
            items: const [
              DropdownMenuItem(value: 'public', child: Text('Public')),
              DropdownMenuItem(value: 'review', child: Text('Hidden')),
            ],
            onChanged: (value) => setState(() => _status = value ?? 'public'),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String>(
            initialValue: _productType,
            decoration: const InputDecoration(labelText: 'Type', border: OutlineInputBorder()),
            items: const [
              DropdownMenuItem(value: 'mobile-app', child: Text('Mobile app')),
              DropdownMenuItem(value: 'website', child: Text('Website')),
              DropdownMenuItem(value: 'dashboard', child: Text('Dashboard')),
              DropdownMenuItem(value: 'marketing', child: Text('Marketing')),
            ],
            onChanged: (value) => setState(() => _productType = value ?? 'mobile-app'),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String?>(
            initialValue: _engagement,
            decoration: const InputDecoration(labelText: 'Engagement', border: OutlineInputBorder()),
            items: const [
              DropdownMenuItem(value: null, child: Text('None')),
              DropdownMenuItem(value: 'employment', child: Text('Employment')),
              DropdownMenuItem(value: 'freelance', child: Text('Freelance')),
              DropdownMenuItem(value: 'personal', child: Text('Personal')),
            ],
            onChanged: (value) => setState(() => _engagement = value),
          ),
          const SizedBox(height: 12),
          DropdownButtonFormField<String?>(
            initialValue: _contributionKind,
            decoration: const InputDecoration(labelText: 'Contribution kind', border: OutlineInputBorder()),
            items: const [
              DropdownMenuItem(value: null, child: Text('None')),
              DropdownMenuItem(value: 'built', child: Text('Built the product')),
              DropdownMenuItem(value: 'features', child: Text('Contributed features')),
              DropdownMenuItem(value: 'maintained', child: Text('Maintained an existing product')),
            ],
            onChanged: (value) => setState(() => _contributionKind = value),
          ),
          _field(_contribution, 'Contribution', lines: 3),
          _field(_tasks, 'Tasks, one per line', lines: 5),
          _field(_technologies, 'Technologies, one per line', lines: 3),
          _field(_completed, 'Completed outcome', lines: 2),
          _field(_links, 'Links, one per line as Label | https://…', lines: 3),
          _field(_experienceId, 'Job id'),
          _field(_alsoTypes, 'Extra types, one per line', lines: 2),
          _field(_audiences, 'Audiences, one per line', lines: 2),
          SwitchListTile(
            contentPadding: EdgeInsets.zero,
            title: const Text('Featured'),
            value: _featured,
            onChanged: (value) => setState(() => _featured = value),
          ),
          if (_error != null) Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
          const SizedBox(height: 12),
          FilledButton(onPressed: _busy ? null : _save, child: Text(_busy ? 'Saving…' : 'Save')),
          if (widget.existing != null) TextButton(onPressed: _busy ? null : _delete, child: const Text('Delete')),
        ],
      ),
    );
  }

  Widget _imageField() {
    final localPath = _localPath;
    final remote = _shot?.src;
    final hasImage = localPath != null || (remote != null && remote.isNotEmpty);
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          if (hasImage)
            DecoratedBox(
              decoration: BoxDecoration(
                border: Border.all(color: Theme.of(context).colorScheme.outline),
                borderRadius: BorderRadius.circular(4),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: AspectRatio(
                  aspectRatio: 16 / 9,
                  child: localPath != null
                      ? Image.file(File(localPath), fit: BoxFit.cover)
                      : Image.network(
                          remote!,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) => const Center(child: Text('Image unavailable')),
                        ),
                ),
              ),
            )
          else
            OutlinedButton.icon(
              onPressed: _busy ? null : _pickImage,
              icon: const Icon(Icons.image_outlined),
              label: const Text('Add image'),
            ),
          if (hasImage)
            Row(
              children: [
                TextButton(onPressed: _busy ? null : _pickImage, child: const Text('Change image')),
                TextButton(onPressed: _busy ? null : _clearImage, child: const Text('Remove')),
              ],
            ),
        ],
      ),
    );
  }
}

class _PostImage {
  _PostImage.file(this.filePath)
      : src = '',
        alt = '',
        width = 0,
        height = 0;

  _PostImage.remote(BlogBlock block)
      : filePath = null,
        src = block.src,
        alt = block.alt,
        width = block.width,
        height = block.height;

  final String? filePath;
  final String src;
  final String alt;
  final int width;
  final int height;
}

class BlogEditor extends StatefulWidget {
  const BlogEditor({super.key, required this.api, this.existing});

  final PortfolioApi api;
  final BlogPostItem? existing;

  @override
  State<BlogEditor> createState() => _BlogEditorState();
}

class _BlogEditorState extends State<BlogEditor> {
  late final TextEditingController _title;
  late final TextEditingController _slug;
  late final TextEditingController _excerpt;
  late final TextEditingController _date;
  late final TextEditingController _tags;
  late final TextEditingController _body;
  late String _track;
  late String _status;
  late List<_PostImage> _images;
  var _slugEdited = false;
  var _busy = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    final post = widget.existing;
    final today = DateTime.now();
    final todayText = '${today.year.toString().padLeft(4, '0')}-${today.month.toString().padLeft(2, '0')}-${today.day.toString().padLeft(2, '0')}';
    _title = TextEditingController(text: post?.title ?? '');
    _slug = TextEditingController(text: post?.slug ?? '');
    _excerpt = TextEditingController(text: post?.excerpt ?? '');
    _date = TextEditingController(text: post?.date.isNotEmpty == true ? post!.date : todayText);
    _tags = TextEditingController(text: listToLines(post?.tags ?? []));
    _body = TextEditingController(text: bodyToText(post?.body ?? []));
    _track = post?.track ?? 'software';
    _status = post?.status ?? 'public';
    _images = (post?.body ?? []).where((block) => block.type == 'image' && block.src.isNotEmpty).map(_PostImage.remote).toList();
    _slugEdited = post != null;
  }

  @override
  void dispose() {
    for (final controller in [_title, _slug, _excerpt, _date, _tags, _body]) {
      controller.dispose();
    }
    super.dispose();
  }

  void _onTitle(String value) {
    if (_slugEdited) return;
    final next = slugFromTitle(value);
    _slug.value = TextEditingValue(text: next, selection: TextSelection.collapsed(offset: next.length));
  }

  Future<void> _pickImage() async {
    if (_images.length >= 8) {
      setState(() => _error = 'A post can have up to 8 images.');
      return;
    }
    final source = await showModalBottomSheet<ImageSource>(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: const Icon(Icons.photo_library_outlined),
              title: const Text('Photo library'),
              onTap: () => Navigator.pop(context, ImageSource.gallery),
            ),
            ListTile(
              leading: const Icon(Icons.photo_camera_outlined),
              title: const Text('Camera'),
              onTap: () => Navigator.pop(context, ImageSource.camera),
            ),
          ],
        ),
      ),
    );
    if (source == null) return;
    try {
      final file = await ImagePicker().pickImage(source: source, maxWidth: 2000, imageQuality: 85);
      if (file == null || !mounted) return;
      setState(() {
        _images = [..._images, _PostImage.file(file.path)];
        _error = null;
      });
    } on PlatformException {
      if (!mounted) return;
      setState(() => _error = 'Allow photo access to add an image.');
    }
  }

  Future<void> _save() async {
    final blocks = blocksFromBody(_body.text);
    if (blocks.isEmpty && _images.isEmpty) {
      setState(() => _error = 'Enter the post.');
      return;
    }
    if (_images.any((image) => image.filePath != null) && _slug.text.trim().isEmpty) {
      setState(() => _error = 'Enter a slug before adding an image.');
      return;
    }
    setState(() {
      _busy = true;
      _error = null;
    });
    try {
      final images = <BlogBlock>[];
      for (final image in _images) {
        final path = image.filePath;
        if (path != null) {
          images.add(await widget.api.uploadPostImage(
            track: _track,
            slug: _slug.text.trim(),
            filePath: path,
            alt: _title.text.trim(),
          ));
        } else if (image.src.isNotEmpty) {
          final alt = _title.text.trim();
          images.add(BlogBlock.image(
            src: image.src,
            alt: alt.isEmpty ? image.alt : alt,
            width: image.width,
            height: image.height,
          ));
        }
      }
      final item = BlogPostItem(
        track: _track,
        slug: _slug.text.trim(),
        status: _status,
        title: _title.text.trim(),
        excerpt: _excerpt.text.trim(),
        date: _date.text.trim(),
        readingMinutes: 1,
        tags: linesToList(_tags.text),
        body: [...blocks, ...images],
      );
      final existing = widget.existing;
      await widget.api.savePost(
        item,
        previousTrack: existing?.track,
        previousSlug: existing?.slug,
      );
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    } catch (_) {
      setState(() => _error = 'Could not save this post.');
    } finally {
      if (mounted) setState(() => _busy = false);
    }
  }

  Future<void> _delete() async {
    final post = widget.existing;
    if (post == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Delete this post?'),
        content: Text(post.title),
        actions: [
          TextButton(onPressed: () => Navigator.pop(context, false), child: const Text('Cancel')),
          TextButton(onPressed: () => Navigator.pop(context, true), child: const Text('Delete')),
        ],
      ),
    );
    if (confirmed != true) return;
    try {
      await widget.api.deletePost(track: post.track, slug: post.slug);
      if (!mounted) return;
      Navigator.of(context).pop(true);
    } on ApiException catch (error) {
      setState(() => _error = error.message);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(widget.existing == null ? 'New post' : 'Edit post')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          DropdownButtonFormField<String>(
            initialValue: _track,
            decoration: const InputDecoration(labelText: 'Track', border: OutlineInputBorder()),
            items: const [
              DropdownMenuItem(value: 'software', child: Text('Software')),
              DropdownMenuItem(value: 'marketing', child: Text('Digital marketing')),
            ],
            onChanged: (value) => setState(() => _track = value ?? 'software'),
          ),
          const SizedBox(height: 12),
          _field(_title, 'Title', onChanged: _onTitle),
          _field(_slug, 'Slug', onChanged: (_) => _slugEdited = true),
          _field(_excerpt, 'Excerpt', lines: 3),
          _field(_date, 'Date (YYYY-MM-DD)'),
          DropdownButtonFormField<String>(
            initialValue: _status,
            decoration: const InputDecoration(labelText: 'Visibility', border: OutlineInputBorder()),
            items: const [
              DropdownMenuItem(value: 'public', child: Text('Public')),
              DropdownMenuItem(value: 'review', child: Text('Hidden')),
            ],
            onChanged: (value) => setState(() => _status = value ?? 'public'),
          ),
          const SizedBox(height: 12),
          _field(_tags, 'Tags, one per line', lines: 3),
          _field(
            _body,
            'Post. Blank line between paragraphs. # starts a heading. - starts a list item.',
            lines: 12,
          ),
          _imagesField(),
          if (_error != null) Text(_error!, style: TextStyle(color: Theme.of(context).colorScheme.error)),
          const SizedBox(height: 12),
          FilledButton(onPressed: _busy ? null : _save, child: Text(_busy ? 'Saving…' : 'Save')),
          if (widget.existing != null) TextButton(onPressed: _busy ? null : _delete, child: const Text('Delete')),
        ],
      ),
    );
  }

  Widget _imagesField() {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          for (var index = 0; index < _images.length; index++)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Row(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: SizedBox(
                      width: 72,
                      height: 72,
                      child: _images[index].filePath != null
                          ? Image.file(File(_images[index].filePath!), fit: BoxFit.cover)
                          : Image.network(
                              _images[index].src,
                              fit: BoxFit.cover,
                              errorBuilder: (context, error, stackTrace) => const Center(child: Icon(Icons.broken_image_outlined)),
                            ),
                    ),
                  ),
                  const Spacer(),
                  TextButton(
                    onPressed: _busy
                        ? null
                        : () => setState(() {
                            _images = [..._images]..removeAt(index);
                          }),
                    child: const Text('Remove'),
                  ),
                ],
              ),
            ),
          OutlinedButton.icon(
            onPressed: _busy || _images.length >= 8 ? null : _pickImage,
            icon: const Icon(Icons.image_outlined),
            label: Text(_images.isEmpty ? 'Add image' : 'Add another image'),
          ),
        ],
      ),
    );
  }
}

Widget _field(TextEditingController controller, String label, {int lines = 1, bool enabled = true, ValueChanged<String>? onChanged}) {
  return Padding(
    padding: const EdgeInsets.only(bottom: 12),
    child: TextField(
      controller: controller,
      enabled: enabled,
      minLines: lines,
      maxLines: lines,
      onChanged: onChanged,
      decoration: InputDecoration(labelText: label, border: const OutlineInputBorder()),
    ),
  );
}
