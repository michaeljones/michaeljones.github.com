
End of Week 2
=============

:date: 2013-10-20
:category: journal

Weekend
-------

* Decided to start looking at the Vty_ module for Haskell based on the
  half-remembered fact that the `Yi text editor`_ uses it for its terminal
  front end.

* Talked through my changes to RigControls_ with my brother.

* Found a `monad tutorial`_ on the Haskell wiki.

.. _Vty: https://github.com/coreyoconnor/vty
.. _Yi text editor: https://github.com/yi-editor/yi
.. _RigControls: https://github.com/Everzen/RigControls
.. _monad tutorial: http://www.haskell.org/haskellwiki/All_About_Monads

Week in Review
--------------

* My attitude towards learning Haskell has shifted as I begin to understand a
  little of its scope. Initial frustration at the helplessness I felt at not
  being able to get anything done has been replaced with an understanding that
  Haskell is not trivial to dive into and a little patience goes a long way.

  In particular the Learn You a Haskell guide feels particularly brilliantly
  laid out and paced. The concepts are built up gradually in a very manageable
  way and, whilst I am finding it hard to think of interesting programs to write
  with the knowledge I have, there is a definite sense of progress which is
  enough to keep the enthusiasm going.

  That said, my attempt at the weekend to pick up and write even the most basic
  program using the Vty_ module was an education in the different between theory
  and practice. It is one thing to read a guide book and quite another to find
  your way. Still, a little foolish googling and a few stackoverflow questions
  later and I am starting to see a little clearer.

  A key issue was that the Vty module does not come with how-to style
  documentation [1] and going from the careful breaks downs of the Learn You a
  Haskell guide to the currently-still-alien pages of the library documentation
  on Haddock was a rather large step. Concepts that I had read about were now
  being presented with unfamiliar content and without the careful reminders
  needed to take it all on board. Still, progress was made, even if in the most
  basic sense and I am a little better equipped than before.

* Getting into the RigControls_ project is still primarily reminding me how
  little indepth experience I have with Qt. It is also curious to dive into an
  existing code base with the intention of cleaning it up some what. Nice to
  have the permission but a fresh lesson in how difficult it can be to tackle a
  new and relatively undocumented code base.

  Possible refactoring would be aided by have test cases but I still have
  trouble understanding how to best tackle those in a GUI application.

* Whilst I am curious to attempt to contribute to a large project like Libre
  Office, or perhaps 0ad, I am finding it a little daunting and easily telling
  myself that there is no rush with other commitments at the moment. I think
  that it fair. I'd be a fool to take on too much and fail to make significant
  progress in any direction.

* Supporting incoming user requests on Breathe continues to be of interest. It
  feels productive to keep pushing it forward a little and to try to keep
  updates clean and useful. I still lack the motivation to take a crack at some
  larger issues and reports whilst I have other things to focus on but I am
  tempted to at least start working through the back log a little rather than
  only picking up new tickets.

.. [1] It is possibly too low level for that with the Vty-UI_ library filling
   need for a widget library on top of the core Vty module.

.. _Vty-UI: http://jtdaugherty.github.io/vty-ui/

