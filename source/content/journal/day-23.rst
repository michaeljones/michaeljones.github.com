
Journal - Day 23
================

:date: 2013-12-02
:category: journal

Intentions
----------

* Read chapter 6 of Real World Haskell.

* Attempt to debug why issue query with github hackage package is failing.

* Attempt to install Autodesk Maya 2014 on Ubuntu 13.04.

Results
-------

* Read chapter 6 and chapter 7.

* Not exactly sure why the github package query was failing but grabbing the
  latest source for the package from github and using that instead seemed to
  resolve the issue. Adding source to a cabal sandbox can be done with the
  following steps::

     # In sandbox
     $ mkdir source-packages
     $ cd source-packages
     $ git clone https://github.com/fpco/github.git
     $ cd ..
     $ cabal sandbox add-source source-packages/github
     $ cabal install --dependencies-only

* Failed to get around to install Maya 2014.

