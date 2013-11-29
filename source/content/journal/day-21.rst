
Journal - Day 21
================

:date: 2013-11-28
:category: journal

Intentions
----------

* Finish chapter 3 and read chapters 4 & 5 of Real World Haskell.

* Investigate adding Github issues and pull requests information to project
  browser.

Results
-------

* Finished chapter 3 and half of chapter 4. I forgot how long they are.

* Started initial investigations in github issues api. Primarily by looking
  through the `developer documentation`_.

* Watched a talk called `8 Lines of Code`_ which focussed on arguing against the
  use of layers of magic in Java code when the end goals can be achieved with
  sensible refactorings of the original code. A convincing argument arching over
  some concepts I am familiar with and pushing things a little further. I am a
  bit of fan of factories but can see the logic here of replacing them with
  lambdas where possible.
  
  Factories, as I use them, are normally to bundle up some state and provide an
  interface for creating objects which need that state. Factory classes are the
  go to tool for this in languages which don't provide currying, closures or
  first class functions. In languages like C++98, objects are more composable
  than functions so it makes sense to make a lot of things into objects as
  composability is a key tool in handling complexity in a growing system. As
  such I use instances of Factory classes for managing object creation and other
  concepts. The talk's speaker argues that a Factory is an anti-pattern
  primarily based on the amount of boiler plate you have to churn out for one in
  C++ or particular Java. The preference for using closures or partially
  function application is based on the reward of stripping out this boiler plate
  whilst maintaining much the same functionality.

  The only downside I can see involves wondering how these closures appear in
  stacktraces when things go wrong. Factories do provide a certain documentation
  of intent in that scenario. Balancing that is my experience knowing I've
  written quite a few nearly pointless factories in my time and stripping them
  away in favour of a single line function application where possible is a
  tempting prospect.

  A similar theme is taken up by Jack Diederich in his `Stop Writing Classes`_
  talk where he rails against single method classes which can be replaced by
  closures and partial application. He is quite invested in this approach as the
  author of the functools module in the Python standard library. Personally, I
  think he takes some of the examples to extreme and loses the shape and self
  documenting nature that classes can bring to code in a quest for maximum reuse
  and minimal line counts.

* Listened to the `Mostly Erlang`_ podcast on `Yesod and FP Complete`_. It
  provides an interesting overview of the motivation behind Yesod and FP
  Complete along with some general Haskell banter. Excellent for general
  knowledge and building up a bigger picture of Haskell.

.. _developer documentation: http://developer.github.com/v3/issues
.. _8 Lines of Code: http://www.infoq.com/presentations/8-lines-code-refactoring
.. _Stop Writing Classes: https://www.youtube.com/watch?v=o9pEzgHorH0
.. _functools: http://docs.python.org/3.3/library/functools.html
.. _Mostly Erlang: http://mostlyerlang.com
.. _Yesod and FP Complete: http://mostlyerlang.com/2013/11/27/023-yesod-and-fp-complete/

