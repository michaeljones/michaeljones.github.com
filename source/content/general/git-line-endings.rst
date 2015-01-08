
Vim, Git & Line Endings
=======================

:date: 2015-01-08
:category: blog
:tags: git, vim

I currently work on a team using both Unix & Windows platforms for developing a
Python & Django codebase. I work in Ubuntu and today made changes to a file
which was created by the Windows developer on our team. With a tighter process
this wouldn't be a problem, but the set up is pretty loose in this respect and I
ended up in the zone of line ending despair. 'Line ending hell' seems to strong
a term.

The Problem
-----------

The issue ended up being that some files in the codebase have CRLF (Windows)
style line endings and some don't. Not great.

And it seems that ``git`` converts all line endings to LF (Unix) when staging
and committing files.

When vim is set to ``fileformats=unix,dos``, it is open to both styles of line
endings and silently preserves whatever is in the file without showing you. As
do most modern editors I imagine.

So vim handles the CRLF file transparently, but when you ``git add -p`` the
changes into the index git converts all CRLFs to LFs and then shows you that
your working copy, which still has the CRLFs, has changes against your index,
which only has LFs. This appears a little confusing if you didn't realise your
file had Windows line endings to begin with.

My trouble is that the team generally uses Mercurial (I use git-remote-hg) and
Mercurial never attempts to convert line endings so in our codebase all CRLF
files & LF files just get passed around happily and everyone's editors silently
deal with whatever they are given.

I respect Mercurial's choice as if you perform CRLF to LF conversion on a binary
file then you'll corrupt it and these tools cannot figure out text from binary
files with 100% accurary. I respect git's because in cross-platform teams like
this one you kind of want to settle on a particular line ending as a convention
instead of having different files with different conventions.

The Solution
------------

The answer should be to establish a convention within the team. My answer, as
I'm pretty new and don't want to rock the boat, is to tell git to mimic
Mercurial and just ignore all line endings. This can be achieved with a
``.gitattributes`` file and the following lines::

   *.py -text
   *.html -text
   *.css -text

Repeated for as many text file types as you have. The ``-text`` value tells git
not to apply any kind of text processing to it when adding, committing or
checking out. The difference between ``-text`` and ``binary`` in this context,
which is another option, is that ``binary`` also prevents git from attempting to
show you a diff of the file at any point with the usual commands that normally
would.

And then Whitespace
-------------------

If you use ``apply.whitespace=fix`` to make sure your ``git add -p`` code
changes are sanitized for whitespace then you still have a problem. We haven't
told git to respect the line endings in the file, we've just told it to ignore
them. So it is still thinking in terms of LFs and when it see some line ending
with::

   ... my_variable;<CR><LF>

It sees the ``CR`` as trailing whitespace before the line ending. So we have to
use the::

   core.whitespace=cr-at-eol

config option which is a special setting to instruct git not to view ``CR``
characters as trailing whitespace. ``core.whitespace`` can take a comma
separated list of different values so make sure you check yours before adding
that additional value.
