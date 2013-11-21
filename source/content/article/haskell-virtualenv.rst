
Haskell's Sandbox & Python's Virtualenv
=======================================

:date: 2013-11-21
:category: article
:tags: haskell

Cabal's sandboxes for Haskell provide an excellent way to contain the
dependencies of a project and help to resolve clashes with other projects you
might have on the system.

They work brilliantly with libraries which are automatically picked up by
``cabal build`` but they lack decent support for the executables which can some
with Haskell packages such as hlint_ and scan_.

Enter Python's virtualenv_.

The Python ecosystem has a similar sandbox tool called virtualenv which is used
for managing dependencies in a isolated manner on a per-project basis.
Fortunately, virtualenv has solved the executables issue by creating shell
scripts to be sourced when using the virtual environment which configure the
user's shell/environment appropriately.

Both Cabal Sandboxes and Python virtualenv have a similar ``/usr`` inspired
layout including a ``bin`` directory for the executables so we can use the setup
scripts from the virtualenv to put the sandbox executable directory in our
environment if we make our sandbox into a virtualenv directory as well.

Fortunately, this is pretty easy. To create a sandbox folder with a specific
name, we use the ``--sandbox`` flag. For example, to create a sandbox called
``projectenv`` we run::

   $ cabal sandbox init --sandbox=projectenv

And then to overlay a Python virtualenv setup over this directory we run::

   $ virtualenv projectenv

Simple as that.

Now, when we install hlint::

   $ cabal install hlint

And initialise our Python virtualenv::

   $ source projectenv/bin/activate

Then we get our sandbox hlint on the path::

   $ which hlint
   /home/user/code/project/projectenv/bin/hlint

Done!

.. _hlint: http://hackage.haskell.org/package/hlint
.. _scan: http://hackage.haskell.org/package/scan
.. _virtualenv: http://www.virtualenv.org/en/latest/

