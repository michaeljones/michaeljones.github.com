
Install Pip on a Fresh Setup
============================

:date: 2014-09-09
:category: article
:tags: python, pip

I've recently switch to a fresh Linux machine and needed to begin setting up my
standard environment. Part of the set up is creating some Python virtual
environments from which to runs various helpers scripts that I like to have
access to.

However, my fresh machine does not have ``pip`` installed on it and as I never
want to ``pip install`` modules to my ``/usr`` area, I'd rather keep it that
way [#]_.

So we need to install ``pip`` on a clean set up. The pip installion
documentation shows that they provide a ``get-pip.py`` script for exactly this
situation.

The only trouble is that ``get-pip.py`` seems to want to install into ``/usr``
by default, which is understandable but not what I am after.

Further to this, I have had no luck with the ``--install-option`` flag that is
advertised by ``python get-pip.py -h``.

What does work though is::

    python get-pip.py --user

Which adopts the Python *user scheme* for installations which on Linux installs
to ``~/.local`` by default. You can check the install location with::

    python -c "import site; print site.USER_BASE"

The base directory for the *user scheme* can be controlled with the
``PYTHONUSERBASE`` environment variable so we can create a temporary install of
pip with::

    PYTHONUSERBASE=/tmp/python2.x python get-pip.py --user

You can then install ``virtualenv`` with::

    PYTHONUSERBASE=/tmp/python2.x /tmp/python2.x/bin/pip install --user virtualenv

Then you can create a proper virtualenv with::

   PYTHONPATH=/tmp/python2.x/lib/python2.7/site-packages /tmp/python2.x/bin/virtualenv ~/myvirtualenv

And then you have something to work with.

Having written all this out, maybe there is an easier way. But until I figure
that out, I have this for reference.

.. [#] If I do not have ``pip`` installed at the system level then I can only
       run ``pip install`` from inside virtualenvs which is nice and contained and so
       there is a little less to worry about.


