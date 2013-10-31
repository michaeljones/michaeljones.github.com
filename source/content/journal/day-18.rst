
Journal - Day 18
================

:date: 2013-10-30
:category: journal

Intentions
----------

* Properly explore the idea of directives for Breathe_ which automatically
  handle the doxygen generation.

.. _Breathe: http://github.com/michaeljones/breathe

Results
-------

* Rewrote the doxygenindex directive in Breathe to add a custom ``DoxygenNode``
  to the docutils document which is then picked up and processed by a custom
  Transform operation.

  It was then possible to add an autodoxygenindex directive which output a
  ``DoxygenAutoNode`` which could be processed, doxygen xml could be generated
  to a temporary folder and then the node would be replaced with an
  appropriately configured ``DoxygenNode`` to fit with the standard processing.

  The transforms are quite easy to work with and a really rather excellent part
  of the docutils infrastructure.

