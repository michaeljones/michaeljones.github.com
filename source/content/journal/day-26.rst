
Journal - Day 26
================

:date: 2013-12-05
:category: journal

Intentions
----------

* Read chapter 9 of Real World Haskell.

* Figure out how to replace the text in Group widget in the Jump interface once
  we have information back from the Github API.

Results
-------

* Read chapter 9 of Real World Haskell.

* Did not get around to actually querying the Github API but created functions
  for formatting the information panel in the Jump UI which are ready to take
  the Github data.

  Involved my first attempt to right something in the wild in the Maybe monad.
  I've done a lot in the IO Monad but I don't really understand the role of bind
  in that situation. Took a while to get a feel for it and how best to express
  the functions and whether they should know about the Maybe Monad or be lifted
  into it.

  It also became a lesson in knowing when you want to recover from errors and
  when you want to just let the Nothing state of the Maybe propagate. I feel
  like my situation had places where bind was not the best choice and something
  which took a Nothing and propagated a default value would be preferable. Still
  interesting to experiment with it and feel how seemlessly it fits in to the
  Haskell experience.

