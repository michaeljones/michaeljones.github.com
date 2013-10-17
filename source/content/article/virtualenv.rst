
Discovering Virtualenv
======================

:date: 2013-10-17
:category: article
:tags: python

I've used Python for around 8 years now. It is the main scripting language of
the visual effects industry so it gets used for all kinds of glue between other
programs and for interfaces for tools.

In this role, I've never had to set up a server or do a deployment of a some
kind of complete unit and so whilst I have been aware of virtualenv_ I've never
seen the need for it in my life.

Of course, being a Python programmer, I've wanted to pull in third-party
libraries and it rarely seems appropriate, and is sometimes impossible, to
install them into the central ``/usr`` area on the machine. So a while ago, I
adopted the convention of maintaining a ``$HOME/local`` folder in which I kept a
mini ``/usr`` hierarchy with my various required bits of software.

This works because pip_ and easy_install_ take some form of ``prefix`` arguments
to allow for targeted installs. ``pip`` requires the slightly less than obvious
use of the ``install-option`` flag like so::

   pip install --install-option="--prefix=$HOME/local" <module name>

But it is something you can get used to.

The ``$HOME/local/bin`` and corresponding Python module install location are
then added to my ``PATH`` and ``PYTHONPATH`` respectively in my ``.zshrc`` and
all is well. Kind of.

.. _pip: http://www.pip-installer.org/en/latest/
.. _easy_install: http://pythonhosted.org/distribute/easy_install.html
.. _virtualenv: http://www.virtualenv.org/en/latest/

The Problem
-----------

This works pretty well. It is manageable. But the point where it started to fall
apart for me is when I wanted multiple versions of the same Python module
installed. This pretty much works. Python bootstraps tend to specify the exact
version they want via ``pkg_resources`` and some installs provide bootstrap
scripts with different suffixes for the different versions so we can pick and
choose to some degree.

The issue is that some modules, or tools, like Sphinx_ provide a boostrapped
executable without a suffix or at least one which is called without the suffix
by standard workflow tools (like the Makefile that Sphinx generates.) The
trouble encountered here is that the module version that the executable ends up
being from the last version of Sphinx that you installed.

This is fine in the usual update track of simply replacing the last version with
something newer and shinier, however it fails if you ever want to go back to the
last version. This is relevant in two ways:

1. If you want to test a new alpha/beta release whilst still being able to go
   back to stable.
2. If you want to test a module under Python 3 whilst still being able to go
   back to Python 2.

.. _Sphinx: http://sphinx-doc.org

The Solution
------------

Fortunately other people have encountered this issue and written virtualenv_.
The design seems to be that instead of a single centralised install location for
all your Python modules, you create as many individual install locations as you
need for the different requirements of your projects.  

This might be one location per project, or a shared location for some projects
with common settings and other locations for more specific ones. How to do this?
Virtualenv makes it pretty easy. Once it is installed, just run::

   virtualenv <location name>

For example::

   virtualenv python-2.7.4

And it will create a small ``/usr`` style hierarchy in a folder called
``python-2.7.4`` in your current directory. I haven't come up with a better
naming convention than the Python version yet but really it should be dictated
by the requirements of the project.

Virtualenv creates the hierarchy, installs a copy of the current Python
interpreter that you are using, the standard library, as well as ``pip`` and
``easy_install`` and sets up some scripts which can be sourced to add the
hierarchy to your environment. From there you source the environment
scripts as so::

   source python-2.7.4/bin/activate

And then you're ready to go. 

The presence of ``pip`` in this new location makes it fantastically easy to install new
modules to that virtual environment. The ``activate`` script will put that
``pip`` executable on your ``PATH`` and invocations of it will install modules
to your new environment.

So then, whenever you have a project with a particular set of requirements,
create a new virtualenv location, source the script, ``pip install`` your
requirements and away you go.

Minor Issues
------------

The ``activate`` scripts do not attempt to set or change your ``PYTHONPATH``.  I
found this confusing at first but the new install of Python is already hardcoded
to check its local ``site-packages`` directory and everything is installed in
there so the ``PYTHONPATH`` is not required.

This complicated things when transitioning from my previous set up to using more
virtualenv locations as my ``PYTHONPATH`` was still set to my ``$HOME/local``
install which would be preferentially picked up over the modules in the
virtualenv which rather defeated the point.

This is fixable by no longer setting a ``PYTHONPATH`` in my ``.zshrc`` but then
my small workflow scripts started failing as they wanted to find modules in
``$HOME/local`` and that was no longer exposed. My approach to solving this is
simply to create some additional virtual environments under ``$HOME/local``
which represent a useful grab-bag of modules for these scripts and then write
a shell wrapper to source the virtual environment ``activate`` script and then
run the original Python file.

So my, previously Python, ``jump`` script has now become a shell script which
looks like this::

   #!/bin/sh

   # Source the appropriate virtualenv
   . /home/mike/local/python/python-2.7.4/bin/activate

   jump-impl

Where ``jump-impl`` contains the contents of the original ``jump`` script and
happily finds the ``yaml`` module that I've installed to the virtual environment
in ``/home/mike/local/python/python-2.7.4``.

