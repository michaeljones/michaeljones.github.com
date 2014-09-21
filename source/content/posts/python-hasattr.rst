
Watch Out for Python's HasAttr & AttributeError
===============================================

:date: 2014-09-21
:category: post
:tags: python

I was recently trying to contribute to the `django-datetime-widget`_ repository
and encountered an issue with my changes not working but no error being reported
from Django or Python.

I was working on the widget's ``_media`` method which is converted to a
read-only ``media`` property. Django is meant to use the value of the ``media``
attribute on a widget class to help include any additional CSS, images &
Javascript files into the final web page template that uses the widget.

In order to test for the presence of the ``media`` attribute, Django uses the
following code::

    try:
        base = sup_cls.media
    except AttributeError:
        base = Media()

It tries to access the attribute and if it receives an ``AttributeError`` then
it uses the replacement value ``Media()`` instead. This is reasonable for basic
attributes on classes, but when combined with Python properties which can allow
attribute access to result in complex method calls then there is room for
trouble.

My issue was that in my ``_media`` implementation I had made a mistake that was
resulting in an ``AttributeError`` being raised. And the trouble was that this
was being silently caught by Django which was intepretting it as there not being
a ``media`` attribute at all and so I was neither seeing the error or my
expected includes in the final rendered HTML.


My Proposed Solution
--------------------

Hoping to make the world a better place, I headed over to the Django-users
mailing and posted that maybe we could approach this differently. I thought that
maybe the following implementation would avoid this issue::

    if hasattr(sup_cls, 'media'):
        base = sup_cls.media
    else:
        base = Media()

I thought that using the ``hasattr`` check instead of waiting for an exception
to be raised would avoid this issue. I assumed that all that ``hasattr`` did was
to check if the object in question had a particular attribute. Crazy right?


The Problem with my Solution
----------------------------

It turns out this does not work. The kind people on the list educated me in
the ways of ``hasattr`` and why this approach doesn't help. I had been foolish
enough not to test my proposed solution and it turns out that the documentation
covers why it won't actually work::

    hasattr(object, name) -> bool

    Return whether the object has an attribute with the given name.
    (This is done by calling getattr(object, name) and catching exceptions.)

There it is: ``hasattr`` is implemented in terms of calling ``getattr`` and
catching all exceptions. So it would fail on my buggy implementation of
``_media`` in just the same way that the current test does.

Damn shame really, as it is incredibly confusing to have no results and no
feedback.

Fortunately, Python 3 fixes this issue apparently and Python 2 is stuck with the
current functionality for backwards compatibility. 


.. _django-datetime-widget: https://github.com/asaglimbeni/django-datetime-widget

