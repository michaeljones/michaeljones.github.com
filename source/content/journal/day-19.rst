
Journal - Day 19
================

:date: 2013-10-31
:category: journal

Intentions
----------

* Review work on Breathe_ from yesterday, merge results into master and do a new
  PyPI release.

* Read the first two chapters of Real World Haskell.

* Do some test exploratory coding with the IORef type in Haskell.

Results
-------

* Released Breathe_ 1.1.0 on PyPI_.

* Read the introduction and first chapter of `Real World Haskell`_.

* Written a basic example of working with the IORef_ type:

  .. code-block:: haskell

     import qualified Data.IORef as R

     main = do

         -- Create a new IORef for handling a mutable number
         intioref <- R.newIORef 5

         -- Read the number
         i <- R.readIORef intioref

         -- Print the number
         print i

         -- Increment the number in place
         R.writeIORef intioref $ succ i

         -- Prin the number
         R.readIORef intioref >>= print

         return ()

  I need to dig some more to attempt to understand what is actually going on and
  the best way to think about it.

* Wrote a simple `undo stack`_ for the RigControls_ project.

.. _Breathe: http://github.com/michaeljones/breathe
.. _PyPI: https://pypi.python.org/pypi/breathe
.. _Real World Haskell: http://book.realworldhaskell.org/read/
.. _IORef: http://hackage.haskell.org/package/base-4.6.0.1/docs/Data-IORef.html
.. _undo stack: https://github.com/Everzen/RigControls/pull/4
.. _RigControls: https://github.com/Everzen/RigControls


