
Journal - Day 25
================

:date: 2013-12-04
:category: journal

Intentions
----------

* Finish chapter 8 of Real World Haskell and read chapter 9.

* Try to figure out how to have a panel in a vty-ui interface in which the
  content can easily be changed.

Results
-------

* Busy day so only finished chapter 8.

* Discovered that vty-ui has a group concept for parts of the UI which need to
  switch between different widgets. Unfortunately the API involves the Group
  structure being parametrised on its contents so you can have a Group with
  different types of widgets in different pages within it.

  Fortunately the FormattedText type in vty-ui will most likely prove
  sufficient for displaying some basic information.

  In an attempt to see how one might deal with the situation in Haskell I came
  across `Existential Types`_ which seems like they would do the job and there
  is even a `blog post`_ referencing them in vty-ui but I can't see any trace in
  the current API.

.. _Existential Types: http://www.haskell.org/haskellwiki/Existential_type
.. _blog post: http://lukepalmer.wordpress.com/2010/01/24/haskell-antipattern-existential-typeclass/

