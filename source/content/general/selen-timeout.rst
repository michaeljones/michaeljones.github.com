
Django, Selenium & Timeouts
===========================

:date: 2015-02-02
:category: blog
:tags: django, selenium

My Selenium tests in my Django testsuite have been failing from intermittent
timeouts. Nothing repeatable which makes debugging it an nightmare. I am not
wise in the ways of Selenium so Google & Stackoverflow were my tools but they
failed me this time.

The timeouts occur at the start of a test when running the first ``get`` on the
starting URL. The correct page would load but no further commands would have any
effect and it would just hang there before the tests timed out.

After much head scratching and attempts at adding waits & delays, I've finally
settled on this. I use the ``open`` method below for these calls now and in the
case of a timeout it kills the process and starts again. To my great relief it
seems to be working:

.. code-block:: python

   import socket

   from django.test import LiveServerTestCase

   from .webdriver import CustomWebDriver


   class SeleniumTestCase(LiveServerTestCase):

       def setUp(self):
           self.wd = CustomWebDriver()

       def tearDown(self):
           self.wd.quit()

       def open(self, url):
           """Open helper with brutal management of socket.timeout exceptions
           that can arise from the selenium driver. We catch them, kill the
           browser, restart everything and try again.

           Should be ok as there is no relevant state in the browser itself at
           the point of page load.
           """

           count = 0
           while True:
               try:
                   self.wd.get("%s%s" % (self.live_server_url, url))
                   break
               except socket.timeout:
                   print "socket.timeout - caught & suppressed. Restarting."
                   self.wd.binary.kill()
                   self.wd = CustomWebDriver()

                   count += 1
                   if count > 3:
                       raise
