#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = u'Michael Jones'
SITENAME = u'mjones dev blog'
SITEURL = ''

TIMEZONE = 'Pacific/Auckland'

OUTPUT_PATH = '../dev-blog/'
USE_FOLDER_AS_CATEGORY = False

DEFAULT_LANG = u'en'

DELETE_OUTPUT_DIRECTORY = True

# Use local theme folder
THEME = 'theme'
CSS_FILE = 'custom.css'

# Url Controls
ARTICLE_URL = 'posts/{date:%Y}/{date:%m}/{date:%d}/{slug}/'
ARTICLE_SAVE_AS = 'posts/{date:%Y}/{date:%m}/{date:%d}/{slug}/index.html'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS =  ()

# Social widget
SOCIAL = ()

DEFAULT_PAGINATION = False

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
