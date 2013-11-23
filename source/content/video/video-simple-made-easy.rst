
Video: Simple Made Easy
=======================

:date: 2013-11-24
:category: video
:tags: haskell

`A talk`_ from `Rich Hickey's Greatest Hits`_ in which he tries to define a
difference between easy and simple and the importance of the latter. He
highlights various elements of a programmer's toolkit which promote simplicity
within your code base.

It is definitely in favour of functional programming approaches, in particular
aspects of Clojure, unsurprisingly, and Haskell. Certainly makes me want to try
to pick up Clojure after Haskell.

Queues
------

A particular 'Ah-ha' moment for me is where he emphasises the use of queues to
decouple two parts of a system. He recommends them over having part ``A`` call
directly into part ``B``. Whilst he does not go into detail on the concept, I
assume you have part ``A`` pushing items on to the queue and part ``B`` reading
out of the queue to find its next workload.

This is new to me as an idea but his phrasing: "if you're not doing this, start
doing it now", reminds of the exactly what I resort to when I try to convey
aspects of programming that I consider important. Some ideas grow on you to seem
so critical that you just want people to embrace them now and learn the
importance for themselves through their own experience.

That said, there is a huge amount to take away from this talk. The simple vs
easy division puts words to feeling I've had for a while and what frustrates me
in subtle ways about the way some people program.

.. _A talk: http://www.infoq.com/presentations/Simple-Made-Easy
.. _Rich Hickey's Greatest Hits: http://thechangelog.com/rich-hickeys-greatest-hits/

