
Journal - Day 13
================

:date: 2013-10-23
:category: journal

Intentions
----------

* Improve & update information on michaeljones.github.io.

* Grab the source code for IHaskell_.

* Experiment with the vty-ui_ library

* Read the final chapter of Learn You a Haskell.

.. _IHaskell: http://gibiansky.github.io/IHaskell/
.. _vty-ui: http://hackage.haskell.org/package/vty-ui

Results
-------

* Did not update michaeljones.github.io.

* Did not grab the source for IHaskell_.

* I read the final chapter of Learn You a Haskell which is introducing the idea
  of Zippers. It doesn't really wrap up the tutorial with any kind of conclusion
  which makes it feel like there might be more to come. The FAQ also promises a
  set of accompanying exercises at some point but I think it might have been
  promising that for a while.

  Still by far the best Haskell tutorial I've come across.

* Read the majority of the documentation for the vty-ui_ library and built a
  basic :abbr:`TUI <Text User Interface>` application which uses the List
  functionality from vty-ui. Quite exciting to be writing something new,
  interpreting compile errors and getting things to work. Still early days but
  feels great to be coding.

* Watched a talk on `Purely Functional I/O`_ which covers the pure nature of
  Haskell and introducing some pure ideas into Scala. It is a solid presentation
  which gently covered some very interesting ideas. Again, I wonder how people
  are meant to watch it without a basic understanding of Haskell but maybe it is
  fine. A couple of *Ah-Ha!* moments for me: firstly his three stage code
  refactoring example, going from:

  .. code-block:: scala

    class Cafe {
      def buyCoffee(cc: CreditCard): Coffee = {
        val cup = new Coffee()
        Payments.charge(cc, cup.price)
        cup
      }
    }

  Where the payment mechanism is hard coded through a singleton which means
  limited modularity and difficulty in testing as you can't substitute a mock
  payments system. To:

  .. code-block:: scala

    class Cafe {
      def buyCoffee(cc: CreditCard, p: Payments): Coffee = {
        val cup = new Coffee()
        p.charge(cc, cup.price)
        cup
      }
    }

  Where the payments mechanism is an explicit dependency of the method and has
  to be injected, which allows for greater modularity, but still isn't as
  flexible as it could be as you cannot easily combine payments. To:

  .. code-block:: scala

    class Cafe {
      def buyCoffee(cc: CreditCard): (Coffee, Charge) = {
        val cup = new Coffee()
        (cup, new Charge(cc, cup.price))
      }
    }

  In which the ``buyCoffee`` mechanism is only responsible for returning a
  ``Charge`` object which can be separately processed and combined if desired
  before the final payment is done.

  I'm very used to the second set of code from a writing code to test as covered
  in `Miško Hevery's`_ `Clean Code`_ Google Tech Talks, but the third set
  feels like it might just be another step forward and something well worth
  taking on board. The pure functional angle here is that the method only
  creates new objects it doesn't change any state but the pay offs are perhaps
  larger than I would associate with that simple statement.

  The second *Ah-Ha!* moment was hearing again how Haskell handles IO code and
  side-effects. I felt my understanding click a step deeper with this talk.
  Mostly his focus on the fact that IO is possible in a pure way and that is
  whilst Haskell has functions that perform IO and therefore have side-effects,
  they are never executed by the programmers code. Rather, the programmer has
  pure code which passes these IO performing functions around as data and then
  Haskell runtime, whatever is managing the execution of ``main``, ultimately
  executes them and passes their results back into the pure code as part of the
  evaluation of the program.

  He emphasises that pure code is referentially transparent which means that
  every time you run a function with the same arguments it returns the same
  results. Haskell perhaps can be viewed as running pure functions which return
  functions which will do side-effecting actions, but as long as we're only
  talking about returning functions that, if run, would have side-effects, rather
  than actually running those functions ourselves then we are still pure. The
  functions are data that we're passing around which can be done in a manner
  oblivious to their underlying impure nature.

  To keep a track of what is going on we label these functions with the IO type
  but that is little more than a convention aided by the type system. IO doesn't
  bestow magical powers on the functions.

  This all may or may not be wrong but it is my current understanding.

.. _Purely Functional I/O: http://www.infoq.com/presentations/io-functional-side-effects
.. _Clean Code: https://www.youtube.com/playlist?list=PLBDAB2BA83BB6588E
.. _Miško Hevery's: http://misko.hevery.com/

