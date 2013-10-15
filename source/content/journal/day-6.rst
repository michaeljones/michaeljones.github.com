
Journal - Day 6
===============

:date: 2013-10-14
:category: journal

Intentions
----------

* Finish chapter 6 and read chapter 7 from Learn You a Haskell.
* Look into supporting the image syntax from Doxygen in Breathe. Ticket_.
* Compile a program which reads a yaml file using the yaml_ library in Haskell.

.. _Ticket: https://github.com/michaeljones/breathe/issues/67
.. _yaml: http://hackage.haskell.org/package/yaml

Results
-------

* Finished chapter 6, read chapter 7 and half of chapter 8. It is a really good
  book.
* Made a first pass at supporting image syntax in Breathe. Pushed changes for
  review by user.
* Compiled a program which pulls in the Yaml package but I have not figured out
  how to use it yet. I did learn about the ``-package`` flag for ``ghc`` though
  which is a step::

   ghc -package yaml blah.hs

  Then you can do::

   import qualified Data.Yaml as Y

  In your actual program.

