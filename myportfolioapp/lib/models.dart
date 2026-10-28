class MonthPoint {
  MonthPoint({required this.year, required this.month});

  final int year;
  final int month;

  factory MonthPoint.fromJson(Map<String, dynamic>? json) {
    return MonthPoint(
      year: (json?['year'] as num?)?.toInt() ?? DateTime.now().year,
      month: (json?['month'] as num?)?.toInt() ?? 1,
    );
  }

  Map<String, dynamic> toJson() => {'year': year, 'month': month};
}

class ExperienceItem {
  ExperienceItem({
    required this.id,
    required this.role,
    required this.company,
    required this.location,
    required this.start,
    this.end,
    required this.bullets,
    required this.related,
    required this.technologies,
    required this.projectIds,
  });

  final String id;
  final String role;
  final String company;
  final String location;
  final MonthPoint start;
  final MonthPoint? end;
  final List<String> bullets;
  final List<String> related;
  final List<String> technologies;
  final List<String> projectIds;

  factory ExperienceItem.fromJson(Map<String, dynamic> json) {
    return ExperienceItem(
      id: json['id'] as String? ?? '',
      role: json['role'] as String? ?? '',
      company: json['company'] as String? ?? '',
      location: json['location'] as String? ?? '',
      start: MonthPoint.fromJson(json['start'] as Map<String, dynamic>?),
      end: json['end'] is Map<String, dynamic> ? MonthPoint.fromJson(json['end'] as Map<String, dynamic>) : null,
      bullets: _strings(json['bullets']),
      related: _strings(json['related']),
      technologies: _strings(json['technologies']),
      projectIds: _strings(json['projectIds']),
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'role': role,
        'company': company,
        'location': location,
        'start': start.toJson(),
        if (end != null) 'end': end!.toJson(),
        'bullets': bullets,
        'related': related,
        'technologies': technologies,
        'projectIds': projectIds,
      };
}

class ProjectLink {
  ProjectLink({required this.label, required this.href});

  final String label;
  final String href;

  factory ProjectLink.fromJson(Map<String, dynamic> json) {
    return ProjectLink(label: json['label'] as String? ?? '', href: json['href'] as String? ?? '');
  }

  Map<String, dynamic> toJson() => {'label': label, 'href': href};
}

class ProjectShot {
  ProjectShot({required this.src, required this.alt, required this.width, required this.height});

  final String src;
  final String alt;
  final int width;
  final int height;

  factory ProjectShot.fromJson(Map<String, dynamic> json) {
    return ProjectShot(
      src: json['src'] as String? ?? '',
      alt: json['alt'] as String? ?? '',
      width: (json['width'] as num?)?.toInt() ?? 0,
      height: (json['height'] as num?)?.toInt() ?? 0,
    );
  }

  Map<String, dynamic> toJson() => {
        'src': src,
        'alt': alt,
        'width': width,
        'height': height,
      };
}

class ProjectView {
  ProjectView({
    required this.type,
    this.label,
    required this.shots,
    required this.links,
  });

  final String type;
  final String? label;
  final List<ProjectShot> shots;
  final List<ProjectLink> links;

  factory ProjectView.fromJson(Map<String, dynamic> json) {
    final rawShots = json['shots'];
    final rawLinks = json['links'];
    return ProjectView(
      type: json['type'] as String? ?? 'mobile-app',
      label: json['label'] as String?,
      shots: rawShots is List
          ? rawShots.whereType<Map>().map((shot) => ProjectShot.fromJson(Map<String, dynamic>.from(shot))).toList()
          : const [],
      links: rawLinks is List
          ? rawLinks.whereType<Map>().map((link) => ProjectLink.fromJson(Map<String, dynamic>.from(link))).toList()
          : const [],
    );
  }

  Map<String, dynamic> toJson() => {
        'type': type,
        if (label != null && label!.trim().isNotEmpty) 'label': label!.trim(),
        'shots': shots.map((shot) => shot.toJson()).toList(),
        'links': links.map((link) => link.toJson()).toList(),
      };
}

class ProjectItem {
  ProjectItem({
    required this.id,
    required this.status,
    required this.title,
    required this.summary,
    required this.productType,
    this.engagement,
    this.contributionKind,
    this.contribution,
    required this.technologies,
    required this.tasks,
    this.completed,
    required this.links,
    this.screenshot,
    required this.featured,
    this.experienceId,
    required this.alsoTypes,
    required this.audiences,
    required this.views,
  });

  final String id;
  final String status;
  final String title;
  final String summary;
  final String productType;
  final String? engagement;
  final String? contributionKind;
  final String? contribution;
  final List<String> technologies;
  final List<String> tasks;
  final String? completed;
  final List<ProjectLink> links;
  final ProjectShot? screenshot;
  final bool featured;
  final String? experienceId;
  final List<String> alsoTypes;
  final List<String> audiences;
  final List<ProjectView> views;

  factory ProjectItem.fromJson(Map<String, dynamic> json) {
    final rawLinks = json['links'];
    return ProjectItem(
      id: json['id'] as String? ?? '',
      status: json['status'] as String? ?? 'public',
      title: json['title'] as String? ?? '',
      summary: json['summary'] as String? ?? '',
      productType: json['productType'] as String? ?? 'mobile-app',
      engagement: json['engagement'] as String?,
      contributionKind: json['contributionKind'] as String?,
      contribution: json['contribution'] as String?,
      technologies: _strings(json['technologies']),
      tasks: _strings(json['tasks']),
      completed: json['completed'] as String?,
      links: rawLinks is List
          ? rawLinks.whereType<Map>().map((link) => ProjectLink.fromJson(Map<String, dynamic>.from(link))).toList()
          : [],
      screenshot: json['screenshot'] is Map ? ProjectShot.fromJson(Map<String, dynamic>.from(json['screenshot'] as Map)) : null,
      featured: json['featured'] == true,
      experienceId: json['experienceId'] as String?,
      alsoTypes: _strings(json['alsoTypes']),
      audiences: _strings(json['audiences']),
      views: json['views'] is List
          ? (json['views'] as List).whereType<Map>().map((view) => ProjectView.fromJson(Map<String, dynamic>.from(view))).toList()
          : const [],
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'status': status,
        'title': title,
        'summary': summary,
        'productType': productType,
        if (engagement != null && engagement!.isNotEmpty) 'engagement': engagement,
        if (contributionKind != null && contributionKind!.isNotEmpty) 'contributionKind': contributionKind,
        if (contribution != null && contribution!.isNotEmpty) 'contribution': contribution,
        'technologies': technologies,
        'tasks': tasks,
        if (completed != null && completed!.isNotEmpty) 'completed': completed,
        'links': links.map((link) => link.toJson()).toList(),
        'screenshot': screenshot?.toJson(),
        'featured': featured,
        if (experienceId != null && experienceId!.isNotEmpty) 'experienceId': experienceId,
        'alsoTypes': alsoTypes,
        'audiences': audiences,
        if (views.isNotEmpty) 'views': views.map((view) => view.toJson()).toList(),
      };
}

class BlogBlock {
  BlogBlock.paragraph(this.text)
      : type = 'paragraph',
        items = const [],
        src = '',
        alt = '',
        width = 0,
        height = 0;

  BlogBlock.heading(this.text)
      : type = 'heading',
        items = const [],
        src = '',
        alt = '',
        width = 0,
        height = 0;

  BlogBlock.list(this.items)
      : type = 'list',
        text = '',
        src = '',
        alt = '',
        width = 0,
        height = 0;

  BlogBlock.image({required this.src, required this.alt, required this.width, required this.height})
      : type = 'image',
        text = '',
        items = const [];

  final String type;
  final String text;
  final List<String> items;
  final String src;
  final String alt;
  final int width;
  final int height;

  factory BlogBlock.fromJson(Map<String, dynamic> json) {
    final type = json['type'] as String? ?? 'paragraph';
    if (type == 'list') return BlogBlock.list(_strings(json['items']));
    if (type == 'heading') return BlogBlock.heading(json['text'] as String? ?? '');
    if (type == 'image') {
      return BlogBlock.image(
        src: json['src'] as String? ?? '',
        alt: json['alt'] as String? ?? '',
        width: (json['width'] as num?)?.toInt() ?? 0,
        height: (json['height'] as num?)?.toInt() ?? 0,
      );
    }
    return BlogBlock.paragraph(json['text'] as String? ?? '');
  }

  Map<String, dynamic> toJson() {
    if (type == 'list') return {'type': 'list', 'items': items};
    if (type == 'image') return {'type': 'image', 'src': src, 'alt': alt, 'width': width, 'height': height};
    return {'type': type, 'text': text};
  }
}

class BlogPostItem {
  BlogPostItem({
    required this.track,
    required this.slug,
    required this.status,
    required this.title,
    required this.excerpt,
    required this.date,
    required this.readingMinutes,
    required this.tags,
    required this.body,
  });

  final String track;
  final String slug;
  final String status;
  final String title;
  final String excerpt;
  final String date;
  final int readingMinutes;
  final List<String> tags;
  final List<BlogBlock> body;

  factory BlogPostItem.fromJson(Map<String, dynamic> json) {
    final rawBody = json['body'];
    return BlogPostItem(
      track: json['track'] as String? ?? 'software',
      slug: json['slug'] as String? ?? '',
      status: json['status'] as String? ?? 'public',
      title: json['title'] as String? ?? '',
      excerpt: json['excerpt'] as String? ?? '',
      date: json['date'] as String? ?? '',
      readingMinutes: (json['readingMinutes'] as num?)?.toInt() ?? 1,
      tags: _strings(json['tags']),
      body: rawBody is List
          ? rawBody.whereType<Map>().map((block) => BlogBlock.fromJson(Map<String, dynamic>.from(block))).toList()
          : [],
    );
  }

  Map<String, dynamic> toJson() => {
        'track': track,
        'slug': slug,
        'status': status,
        'title': title,
        'excerpt': excerpt,
        'date': date,
        'tags': tags,
        'body': body.map((block) => block.toJson()).toList(),
      };
}

String slugFromTitle(String title) {
  return title.toLowerCase().replaceAll(RegExp(r'[^a-z0-9]+'), '-').replaceAll(RegExp(r'^-+|-+$'), '');
}

List<BlogBlock> blocksFromBody(String value) {
  final blocks = <BlogBlock>[];
  for (final chunk in value.trim().split(RegExp(r'\n\s*\n'))) {
    final lines = chunk.split('\n').map((line) => line.trim()).where((line) => line.isNotEmpty).toList();
    if (lines.isEmpty) continue;
    if (lines.length == 1 && lines.first.startsWith('# ')) {
      final text = lines.first.substring(2).trim();
      if (text.isNotEmpty) blocks.add(BlogBlock.heading(text));
      continue;
    }
    if (lines.every((line) => line.startsWith('- '))) {
      final items = lines.map((line) => line.substring(2).trim()).where((item) => item.isNotEmpty).toList();
      if (items.isNotEmpty) blocks.add(BlogBlock.list(items));
      continue;
    }
    blocks.add(BlogBlock.paragraph(lines.join(' ')));
  }
  return blocks;
}

String bodyToText(List<BlogBlock> blocks) {
  return blocks.where((block) => block.type != 'image').map((block) {
    if (block.type == 'heading') return '# ${block.text}';
    if (block.type == 'list') return block.items.map((item) => '- $item').join('\n');
    return block.text;
  }).join('\n\n');
}

List<String> _strings(Object? value) {
  if (value is! List) return [];
  return value.whereType<String>().map((item) => item.trim()).where((item) => item.isNotEmpty).toList();
}

List<String> linesToList(String value) {
  return value.split('\n').map((line) => line.trim()).where((line) => line.isNotEmpty).toList();
}

String listToLines(List<String> values) => values.join('\n');
