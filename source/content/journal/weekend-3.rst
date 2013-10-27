
End of Week 3
=============

:date: 2013-10-27
:category: journal

Weekend
-------

* Watched `Escape From the Ivory Tower`_ presentation by Simon Peyton Jones. It
  is an approachable easy-listening style talk which gives the history of the
  development of Haskell and the goals of the language. No prior knowledge of
  the language required though, as always, it helps.

* Wrote a `blog post`_ about stumbling through a Haskell Project set up. The
  content is perhaps better covered on the `Haskell Wiki`_ though I found that too
  late.

.. _Escape From the Ivory Tower: http://yow.eventer.com/events/1004/talks/1054
.. _blog post: {filename}/article/haskell-project.rst
.. _Haskell Wiki: http://www.haskell.org/haskellwiki/How_to_write_a_Haskell_program

Week in Review
--------------

* Definitely making progress with Haskell but still nowhere near comfortable
  with it. Clueless on how to begin most tasks but at least I can slowly battle
  my way towards something. Work needs to continue both via exercising the
  knowledge I have and also by moving on to other tutorials. `Real World
  Haskell`_
  & `Learn Haskell Hard & Fast`_ might be reasonable guides for this stage,
  especially the former

* Improved the performance of RigControls_ and began to toy with the idea of
  tests but, as with any unfamiliar codebase which isn't designed for testing,
  there isn't an easy starting place. Might need more effort than first hoped.

* Fixed an issue with Sphinx-to-Github_ regarding unicode handling. Gave me some
  motivation to read up on unicode a little more and the best practices
  surrounding it and its use in Python. Lessons learned:

  * Data is *decoded* from a particular character-set into unicode point data and
    *encoded* the other way.

  * You have to write files with a particular encoding. You don't write unicode
    point data to a file, or rather you do, but in one of any number of
    character-sets. There isn't a default.

  * You can't find out the encoding of a file unless it has a Byte Order Mark
    (BOM) which tells you. In which case, you need to worry about removing that
    BOM and not interpreting it as text.

  * Ideally you should know the encoding of the files you are trying to read, if
    you don't you're basicall left trying to guess. UTF-8 is a good first guess.

  * You should try to decode as soon as possible so that you're handling
    proper unicode strings in your code rather than ASCII with potentially
    invalid bytes.

  * Python 2.x attempts to read all files as ASCII by default which is the
    source of some head aches with Python 2.x and unicode.

    You can convert either by decoding the string that you have read or by
    reading via ``codecs.open`` which provides an option for the encoding as an
    argument.

  * Python 3.x defaults to reading files at UTF-8 by default and all standard
    strings or unicode by default with the ``bytestring`` type there to handle
    encoded data.

  * UTF-8 is best for content which is going to be largely ASCII.

  * UTF-16 is best for some languages or purposes where the majority of the
    characters fits into 2 bytes.

  * UTF-32 is best for the rest. It is also the fastest to deal with as all
    characters takes the same amount of memory so indexing into the data is
    clean and obvious, however it takes up 4 times as much space as UTF-8 for
    ASCII characters.

.. _Real World Haskell: http://book.realworldhaskell.org/
.. _Learn Haskell Hard & Fast: https://www.fpcomplete.com/school/haskell-fast-hard
.. _RigControls: https://github.com/EverZen/RigControls
.. _Sphinx-to-Github: https://github.com/michaeljones/sphinx-to-github

