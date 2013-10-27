
.. role:: strike
   :class: strike

Setting Up a Haskell Project
============================

:date: 2013-10-27
:category: article
:tags: haskell cabal

This is an attempt to share the my initial discoveries on how to set up a
Haskell project. My plan was to create a small project for an executable written
in Haskell and I didn't have the first idea where to start.

I am new to the language and the ecosystem and this article wanders through my
discovery process. Skip straight to the review_ for a summary.

Note
----

This is well covered in the Haskell Wiki on `How to write a Haskell program`_. I
had not found that guide at the time of working through this.  

.. _How to write a Haskell program: http://www.haskell.org/haskellwiki/How_to_write_a_Haskell_program

Working on Ubuntu 13.04
-----------------------

Following some best practices advice, I wanted to get the `Haskell Platform`_ to
act as a starting point for development. However for reasons that I do not fully
understand, Ubuntu 13.04 does not have a version of the Haskell platform (it
seems to be related to the version of ghc they decided to ship with.)

Follow these_ instructions will get you a working copy of the Haskell Platform
along with the appropriate version of ghc. It takes a while to compile though!
I've installed these into the following directories::

   $TOOLS/apps/ghc/ghc-7.6.3
   $TOOLS/apps/haskell-platform/haskell-platform-2013.2.0.0

For some value of ``$TOOLS``.

.. _Haskell Platform: http://www.haskell.org/platform/
.. _these: http://askubuntu.com/a/316465

Getting Libraries
-----------------

With that going and in my environment, I made a new project directory for my
``jump`` program::

   $ mkdir $WORK/jump

My project is going to need a terminal interface and some googling comes up with
vty_ which appears to be some kind of ncurses equivalent for Haskell. So I try::

   $ cabal install vty

Which tells me to run::

   $ cabal update

Which tells me that there is a new cabal-install package available that I should
update to. I initially install this to::

   $TOOLS/apps/haskell-packages/cabal-1.18.0.2

Using::

   cabal install --prefix=$TOOLS/apps/haskell-packages/cabal-1.18.0.2 cabal-install

As I really like subfoldering things but this soon looks like it'll be too
awkward to manage in my immature set up as each package has its own libraries
and executables which means a lot of paths to figure out unless they are all
grouped together.

So I install it straight to::

   $TOOLS/apps/haskell-packages

This seems to work though the central install location bothers me in the same
way that any centralised collection of dependencies would. Something is going to
conflict at some point. What I really want is some kind of equivalent to
Python's virtualenv_.

.. _vty: http://hackage.haskell.org/package/vty
.. _virtualenv: http://www.virtualenv.org

Ahhh Sandboxes
--------------

Some googling thankfully finds cabal sandboxes which are very much what I am
looking forward. `This page`_ is particularly helpful.

So I follow the instructions and run::

   $ cd $WORK/jump
   $ cabal sandbox init

This seems promising. A ``cabal install vty`` now installs into this local
sandbox set up and I don't have to worry about shared collections of
dependencies anymore.

.. _This page: http://coldwa.st/e/blog/2013-08-20-Cabal-sandbox.html

Compiling
---------

Great, I'm ready to start coding. I make a a trivial ``Main.hs`` file which
pulls in a vty-ui_ module (it turns out the ``vty`` is pretty low level and
vty-ui provide more friendly widgets for building interfaces.)

So let's compile::

   $ ghc --make Main.hs

I haven't read up on the ``--make`` flag but it seems like the thing to do.
Anyway, this doesn't work::

   Main.hs:2:8:
       Could not find module `Graphics.Vty.Widgets.All'
       Use -v to see a list of the files searched for.

No trouble, I've played around with toy ``ghc`` compiles before. I believe there
is a ``-package`` flag to provide paths to packages. Cool. Where is the package?
I run ``find`` in the sandbox and get a lot of paths like this::

   ./.cabal-sandbox/lib/x86_64-linux-ghc-7.6.3/vty-ui-1.6/Graphics/Vty/Widgets/All.hi

My :strike:`spidey` programmer sense is tingling; I've not compiled much in
Haskell but that doesn't look like something to add to a ``-package`` flag. Too
much specific data in there. Just a hunch but I start looking around for
alternatives.

.. _vty-ui: http://hackage.haskell.org/package/vty-ui

Cabal Build
-----------

I couldn't see much else to help with ``ghc`` and it seemed that we were
pretty neck deep in this sandbox so on reviewing the `sandbox guide`_ from
earlier I saw the use of::

   $ cabal build

Worth a crack, right? Well, yes, but this was the response::

   Package has never been configured. Configuring with default flags. If this
   fails, please run configure manually.
   cabal: No cabal file found.
   Please create a package description file <pkgname>.cabal

Ok, we need some kind of configuration file. No idea what goes in it::

   $ touch jump.cabal
   $ cabal build

Progress::

   Package has never been configured. Configuring with default flags. If this
   fails, please run configure manually.
   Resolving dependencies...
   cabal: Using 'build-type: Custom' but there is no Setup.hs or Setup.lhs
   script.

Ok, lets have a look at the `vty project`_ on Github and see what they are
doing. They've got some kind of ``Setup.lhs`` file with this in it::

   #!/usr/bin/env runhaskell
   > import Distribution.Simple
   > main = defaultMain

The yaml_ project I've been keeping an eye on has something similar. Ok::

   $ cat << ENDCAT > Test.lhs 
   #!/usr/bin/env runhaskell
   > import Distribution.Simple
   > main = defaultMain
   ENDCAT
   $ cabal build

And::

   Package has never been configured. Configuring with default flags. If this
   fails, please run configure manually.
   Resolving dependencies...
   [1 of 1] Compiling Main             ( Setup.lhs, dist/setup/Main.o )
   Linking ./dist/setup/setup ...
   Configuring ...
   setup: No 'name' field.

   No 'version' field.

   No executables and no library found. Nothing to do.

Ok. Expecting some kind of ``name`` and ``version`` fields. This is starting to
seem like progress so I look at the vty project ``vty.cabal`` file and we see a
simple key value set up::

   name:    jump
   version: 0.0.0

Vim highlights this which is always a good sign::

   $ cabal build
   Package has never been configured. Configuring with default flags. If this
   fails, please run configure manually.
   Resolving dependencies...
   Configuring jump-0.0.0...
   setup: No executables and no library found. Nothing to do.

More cross referencing with github, this time the yaml_ project and we add::

   executable jump
       main-is: Main.hs

Now we're on to something. We've got a few more warnings but finally some
compile errors! Things are happening. Playing around shows that we need to add::

   cabal-version:   >= 1.2
   build-type:      Simple

To silence the warnings. A guess-and-test shows that we no longer need the
``Setup.lhs`` file now that we have ``build-type`` set to ``Simple``.

.. _vty project: https://github.com/coreyoconnor/vty
.. _sandbox guide: http://coldwa.st/e/blog/2013-08-20-Cabal-sandbox.html
.. _yaml: http://hackage.haskell.org/package/yaml

Dependency Management
---------------------

So those compile errors? They are actually pretty damned cool if you ask me. The
first one sets the tone::

   Main.hs:1:1:
       Could not find module `Prelude'
       It is a member of the hidden package `base'.
       Perhaps you need to add `base' to the build-depends in your .cabal file.

``Prelude`` is the essentially default, built-in functionality in Haskell. All
the functions that you're going to be using all the time so they are just there.
This is included by default in programs if you do a ``ghc`` invocation from the
command line or if you use ``ghci`` but here we're being asked to explicitly
declare the dependency.

Dependencies are a nightmare if they aren't managed properly so I am in favour
of this. Additionally it allows this ``base`` package to changes its contents as
it versions up and projects can declare the version range they require to
operate.

So the next addition is to add the build dependencies to the ``executable``
section::

   executable jump
       main-is: src/Main.hs
       build-depends: base >= 4 && < 5

The ``4`` to ``5`` range is stoten from the ``yaml`` project. This gets extended
in the typical prefixed comma style for further dependencies as the project
grows::

   executable jump
       main-is: src/Main.hs
       build-depends: base >= 4 && < 5
                    , vty-ui == 1.6
                    , vty == 4.7.3
                    , yaml == 0.8.5.1
                    , vector == 0.10.9.1
                    , text == 0.11.3.1

Each time you need a new dependency you can ``cabal install`` it into your
sandbox and then the ``cabal build`` command will make sure you have it properly
specified in your ``.cabal`` file.

.. _review:

In Review
---------

If I wanted an introduction to Haskell project setup, coming from a C++ & Python
background, I would want something like this:

* Cabal sandboxes provide a virtualenv style enviroment for project development.
  Your project root directory becomes your sandbox.

* Your project ``.cabal`` file acts a little like a C++ project's ``Makefile``.
  It also has some flavours of a Python project's ``setup.py`` file.

* A simple set up thankfully only requires a simple configuration file.

* Running ``cabal build`` is roughly the equivalent of running ``make`` for a
  C++ project and the cabal sandox/build set up is much easier to manage than a
  Makefile with paths to all the libraries & headers you require for C++. It is
  more of a build system than a Makefile.

* Build dependencies have to be explicitly declared or else ``cabal build``
  won't compile.

* Your final ``.cabal`` file for a simple single file executable project will
  look a little like this::

   name:            jump
   version:         0.0.0
   cabal-version:   >= 1.8
   build-type:      Simple

   executable jump
       main-is: src/Main.hs
       build-depends: base >= 4 && < 5
                    , vty-ui == 1.6
                    , vty == 4.7.3
                    , yaml == 0.8.5.1
                    , vector == 0.10.9.1
                    , text == 0.11.3.1

