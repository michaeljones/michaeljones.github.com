
Journal - Day 9
===============

:date: 2013-10-17
:category: journal

Intentions
----------

* Finish chapter 11 of Learn You a Haskell.

* Write a blog post about virtual env.

* Grab source code for 0ad from github_.

* Investigate Breathe ticket `#70`_.

.. _github: https://github.com/0ad/0ad
.. _#70: https://github.com/michaeljones/breathe/issues/70

Results
-------

* Finished chapter 11. Tackling Applicative Functors and Monoids. I am beginning
  to get the feeling that Haskell is not a complex language but there are a lot
  of best practices and design patterns, like Applicative Functors and Monoids,
  that they have built on top of base language which are all required for
  understanding the programs out there.

  It is like having to learn C++ and the whole `Gang of Four`_ before starting
  on a C++ project. Sort of. It is harder, I think, as the C++ syntax is
  relatively minimal in some ways so you'd be able to understand a lot of the
  design patterns without learning them from reference. You might not know
  exactly why they are done but you could see what is happening. I feel like
  that is harder in Haskell but only because the abstractions they build up are
  in some ways more complex and in some ways expressed more tersely which makes
  them less approachable.

* Wrote `this blog post`_ about virtual env. Part of me is appalled by the idea,
  I know how late I am to the virtual env game and none of this should be new
  news, however part of me understands that sometimes random blogs posts can be
  useful to the people who stumble across them and they are always helpful to
  their writer so I'm trying to embrace that style of thought.

* Failed to grab the source code for 0ad. I did however play it for a bit and
  managed not to get slaughtered by the first wave of attack.

* Failed to investigate Breathe ticket #70.

* Forked and started some refactoring work on rigcontrols_. Trying to get a feel
  for the code base and the best direction forward for it. It is revealing my
  lack of familiarity with Qt though I have worked with quite a few basic Qt
  interfaces.

  The interface is currently Qt 4.8 based. I would be enthusiastic to port it to
  Qt 5 purely out of interest but I don't think that is going to happen.

.. _this blog post: {filename}/article/virtualenv.rst
.. _rigcontrols: https://github.com/Everzen/RigControls
.. _Gang of Four: http://en.wikipedia.org/wiki/Design_Patterns

