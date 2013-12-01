
Journal - Day 22
================

:date: 2013-11-29
:category: journal

Intentions
----------

* Finish chapter 4 and read chapter 5 of Real World Haskell.

* Investigate HTTP libraries in Haskell for requesting information from the
  Github Rest API.

Results
-------

* Read chapters 4 & 5.

* Looked into using the HTTP_ Haskell library but that doesn't handle HTTPs
  which is required for Github's API. Looked into `http-conduit`_ which handles
  HTTPs but the simpleHttp_ function in that fails with only
  ``InternalIOException`` which doesn't help much.  

  Ended up trying to use the github_ package from Hackage which handles the HTTP
  requests for you but that seems to be tripping over the content of what is
  returned so needs more investigation to understand what is going on.

.. _HTTP: http://hackage.haskell.org/package/HTTP
.. _http-conduit: http://hackage.haskell.org/package/http-conduit
.. _github: http://hackage.haskell.org/package/github
.. _simpleHttp: http://hackage.haskell.org/package/http-conduit-1.9.5.2/docs/Network-HTTP-Conduit.html#v:simpleHttp


