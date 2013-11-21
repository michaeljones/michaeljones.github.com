
Generating a Broken UTF-8 File
==============================

:date: 2013-11-01
:category: article
:tags: unicode


Backstory
---------

Occasionally when looking after Breathe_ and Sphinx-to-Github_ I get bug reports
associated with unicode handling errors. Awkwardly, I do not have a huge amount of
experience with unicode.

Still, I'm keen that these plugins handle unicode properly or at least provide
reasonable error messages when things go wrong. However it is not completely
obvious how to generate invalid files to test these issues.

After a recent bug, I dug a little deeper into how to do this. There might be
much better ways but this is the path I took.

.. _Breathe: https://github.com/michaeljones/breathe
.. _Sphinx-to-Github: https://github.com/michaeljones/sphinx-to-github

Required Information
--------------------

A little googling revealed this `stackoverflow question`_ which points to the
Wikipedia UTF-8_ page which has a section on `invalid codes`_ for a UTF-8 page.

The page also has a table_ of UTF-8 values and includes red boxes for the invalid
charater codes. I don't fully follow the table but underneath it points out that
the first two invalid codes are: ``C0`` and ``C1``.

.. _stackoverflow question: http://stackoverflow.com/questions/13241244/example-of-a-broken-unicode-text
.. _UTF-8: http://en.wikipedia.org/wiki/UTF-8
.. _invalid codes: http://en.wikipedia.org/wiki/UTF-8#Invalid%5Fbyte%5Fsequences
.. _table: http://en.wikipedia.org/wiki/UTF-8#Codepage%5Flayout

Preparing the File
------------------

So armed with this information what can we do? Let's prepare a basic file to
work with. I'm interest in having a test case for Breathe_ so I want some source
code with some invalid characters::

   /*! \brief This is a test . */
   class Test {}

This is a very basic C++ class and a doxygen comment. We leave a placeholder
``.`` in there for us to replace with invalid data. This should be saved as
UTF-8 from your favourite text editor. You can do this from ``vim`` with::

   :set fileencoding=utf8
   :w unicodefile.cpp

Just to check that this reads fine into Python, we can run::

   $ python -c "import codecs; codecs.open('unicodefile.cpp', 'r', 'utf-8').readlines()

And it executes withouth issue.

Breaking the file
-----------------

Now you want to open this file in a hex editor. After a little googling, I've
installed Okteta_ on my Ubuntu machine as it is easily available. Opening the
file, you get a view like this::

   2F 2A 21 20  5C 62 72 69  65 66 20 54  68 69 73 20 | /*! \brief This
   69 73 20 61  20 74 65 73  74 20 2E 20  2A 2F 0A 63 | is a test . */.c
   6C 61 73 73  20 54 65 73  74 20 7B 7D  0A          | lass Test {}.

This is the hexadecimal layout of the bytes in our file on the left and the
ASCII interpretation of these values on the right. The ASCII representation
actually shows new lines as ``.`` characters which makes it harder to see quite
what is going on but the placeholder ``.`` we added is relatively clearly
visible as the one immediately after the word ``test``.

If we highlight that placeholder ``.``, then the program highlights the ``2E``
entry in the third block of the second line of the left hand hexadecimal
representation. If we want to add our invalid data we can select the ``2E`` and
enter one of the invalid values from the Wikipedia article, eg. ``C0``. Do this
and save it as ``brokenfile.cpp``.

Now if we run our test on this file, we get::

   $ python -c "import codecs; codecs.open('brokenfile.cpp', 'r', 'utf-8').readlines()"
   Traceback (most recent call last):
     File "<string>", line 1, in <module>
     File "/home/mike/root/projects/profile/source/python-2.7.4/lib/python2.7/codecs.py", line 679, in readlines
       return self.reader.readlines(sizehint)
     File "/home/mike/root/projects/profile/source/python-2.7.4/lib/python2.7/codecs.py", line 588, in readlines
       data = self.read()
     File "/home/mike/root/projects/profile/source/python-2.7.4/lib/python2.7/codecs.py", line 477, in read
       newchars, decodedbytes = self.decode(data, self.errors)
   UnicodeDecodeError: 'utf8' codec can't decode byte 0xc0 in position 26: invalid start byte

Yay, it's broken and will act as a good test case for checking that our code can
handle invalid input and provide useful error messages.

.. _Okteta: http://www.kde.org/applications/utilities/okteta



