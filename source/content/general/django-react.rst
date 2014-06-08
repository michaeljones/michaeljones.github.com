
Django CSRF React Component
===========================

:date: 2014-06-08
:category: blog
:tags: django, react

I've been doing some web development recently and getting in to Django_ and
`Facebook's React`_ framework.

When creating forms in React for submission to a Django app you need to include
the `Django CSRF token`_ for Django's form processing. A simple way to do this
is to wrap it up as a reusable React component. Like:

.. code-block:: javascript

   var React = require('react');

   var DjangoCSRFToken = React.createClass({

     render: function() {

       var csrfToken = Django.csrf_token();

       return React.DOM.input(
         {type:"hidden", name:"csrfmiddlewaretoken", value:csrfToken}
         );
     }
   });

   module.exports = DjangoCSRFToken: DjangoCSRFToken;

Retrieving the actual CRSF token is done here with help of the Django.js_
helper.  However from the `Django docs`_ you can do it with jQuery_:

.. code-block:: javascript

   // using jQuery
   function getCookie(name) {
       var cookieValue = null;
       if (document.cookie && document.cookie != '') {
           var cookies = document.cookie.split(';');
           for (var i = 0; i < cookies.length; i++) {
               var cookie = jQuery.trim(cookies[i]);
               // Does this cookie string begin with the name we want?
               if (cookie.substring(0, name.length + 1) == (name + '=')) {
                   cookieValue = decodeURIComponent(
                     cookie.substring(name.length + 1)
                     );
                   break;
               }
           }
       }
       return cookieValue;
   }
   var csrftoken = getCookie('csrftoken');

Or with the `jQuery cookie plugin`_:

.. code-block:: javascript

   var csrftoken = $.cookie('csrftoken');

Then save the final component code into a new node module and use it in your
browser javascript with Browserify_ like::

   return (
          <form method='post' action={this.props.acceptUrl}>
            <DjangoCSRFToken />
            <input type="text" name="edit_id" value={edit.id} />
            <input type="submit" name="accept" value="Accept" />
          </form
          );

.. _Django: http://djangoproject.com
.. _Facebook's React: http://facebook.github.io/react/
.. _Django CSRF token: https://docs.djangoproject.com/en/dev/ref/contrib/csrf/
.. _Django.js: https://github.com/noirbizarre/django.js
.. _Django docs: https://docs.djangoproject.com/en/dev/ref/contrib/csrf/#ajax
.. _jQuery: http://jquery.com
.. _jQuery cookie plugin: http://plugins.jquery.com/cookie/
.. _Browserify: http://browserify.org/

