
Idea: Maintain projects as a community through a bot that responds to voting on pull requests & issues
======================================================================================================

:date: 2015-05-31
:category: article
:tags: github

Problem
-------

Some Github projects suffer from being abandoned by their maintainers for many
different and completely understandable reasons. This can even happen to quite
popular projects as there is often no clear mechanism for someone else taking
over without the current maintainer actively engaging.

This can be very frustrating for the users of the projects and those who submit
issues & pull requests. Forking is of course an option but what stops that fork
dying and how to do you figure out which fork to use?


Proposed Solution
-----------------

We create a Github account which is run by a bot. You can request that the bot
forks any other repository on Github. You can then submit pull requests to the
bot's repository and users can vote on whether or not that pull request is
accepted. Votes are made through a clear syntax in pull request comments and the
bot performs the merge if the vote is successful.

The bot should also have accounts with packaging repositories, like npm & PyPI,
and users can create votes around tagging certain commits and releasing those
tags to the packaging repositories as new versions of the software.


Strengths of the Solution
-------------------------

- The vote driven nature allows development to continue as users come and go
  from the project without needing to find new maintainers and new forks each
  time.
- Users could vote other users, including possibly the original project auther,
  into a maintainer role (a registered contributor on the project) to allow more
  direct contribution to the project.
- If successful on a large scale, users would know to look for the
  'community-bot' fork of a project as the best place to find a more maintained
  version of the software.
- You could potentially build a network of trust between projects & users. If I
  make good contributions to a project, I might be gain some trust towards
  contributing to a related project. 


Problems with the Solution
--------------------------

- Who gets a vote? Maybe people who had contributed in some way to the original
  repository before it was forked by the bot? But you would need a way for more
  to get involved in the project.
- Do you have to wait for a critical mass of interested voters? What if one
  person needs an abandoned project, can they use this approach if no one else
  gets involved? Is that even an issue?
- The original maintainer would have to give the bot permissions to release to
  the project on PyPI or npm otherwise you'd have to release a npm package
  called 'package-x' as 'community-package-x' or some such approach.


Questions
---------

- Has this been done before?
- Are there any more obvious problems?
- Are there any solutions to the problems? Does anyone know any approaches that
  allow you to build trusted networks of people like this? I assume it is
  generally a well studied area.
- Any other thoughts? Good idea? Crazy idea?

Motivation
----------

You see references to abandoned projects quite a bit but most recently it has
been `django-crispy-forms <https://github.com/maraujop/django-crispy-forms>`_, a
very popular but currently largely unmaintained project, which has got me
thinking about this issue.
