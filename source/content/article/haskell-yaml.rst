
A Beginner's Encounter with a Haskell Library
=============================================

:date: 2013-10-29
:category: article
:tags: haskell

I am new to Haskell and as a programming exercise I am attempting to rewrite my
``jump`` utility program which I use to switch between common directories in my
shell.

It is currently written in Python and uses the curses library to provide a
terminal user interface for selecting a directory from a list which is then
written to a file. The program works with an alias which tends changes directory
into the contents of that file::

   alias c='$HOME/bin/jump-wrapper; cd `cat /tmp/jump.tmp`'

Where ``jump-wrapper`` sources the appropriate Python virtualenv and then runs
the actual Python script.

The current Python version is a "good enough" implementation with no real error
detection or fault tolerance. It doesn't really have to be tolerant as I control
the input and the simplicity of the script makes it easy to debug.

It feels like a good test project for Haskell as it involves a simple UI and
reading data from a `yaml <http://yaml.org>`__ file which is used for configuration.

The Interface
-------------

For the interface, after some googling, I've opted for the vty_ & vty-ui_
modules, mostly the latter, though that is built on the former.

The vty-ui library has excellent documentation_ and so after working through
their example and reading a little more I have a basic program which present two
options in a list in a terminal UI and allows me to exit from it all with ``q``.

Here it is:

.. code-block:: haskell

   import           Graphics.Vty.Widgets.All

   import           Graphics.Vty.Attributes ( def_attr )
   import           Graphics.Vty.LLInput    ( Key( KASCII) )

   import           System.Exit ( exitSuccess )

   import qualified Data.Text as T

   main :: IO ()
   main = do

       -- Create new list
       list <- newList def_attr

       -- Populate options
       addToList list "choice 1" =<< ( plainText $ T.pack "choice 1" )
       addToList list "choice 2" =<< ( plainText $ T.pack "choice 2" )

       ui <- centered list

       fg <- newFocusGroup
       addToFocusGroup fg list

       c <- newCollection
       _ <- addToCollection c ui fg

       -- Focus group event handlers
       fg `onKeyPressed` exit

       runUi c defaultContext

   -- Callback for exiting via 'q'
   exit _ key _ | key == KASCII 'q' = do { shutdownUi; exitSuccess }
                | otherwise         = return False

Most of this is not fabulously interesting but is included for completeness. The
relevant section here is really this:

.. code-block:: haskell

    -- Create new list
    list <- newList def_attr

    -- Populate options
    addToList list "choice 1" =<< ( plainText $ T.pack "choice 1" )
    addToList list "choice 2" =<< ( plainText $ T.pack "choice 2" )

This is where we create the list and populate it with the options. This is the
part that we're interested in for this article. The plan is to replace it with
code which will read a yaml file and dynamically populate the list based on the
contents of the file.

.. _vty: http://hackage.haskell.org/package/vty
.. _vty-ui: http://hackage.haskell.org/package/vty-ui
.. _documentation: http://jtdaugherty.github.io/vty-ui/manuals/vty-ui-users-manual-1.6.pdf

The File
--------

The yaml config file looks like this::

   - - [sph, /home/mike/root/projects/sph]
   - - [alembic-fs, /home/mike/root/projects/alembic-fs]
   - - [profile, /home/mike/root/projects/profile]
     - [blog, /home/mike/root/projects/profile/blog]
   - - [lastcontact, /home/mike/root/projects/lastcontact]
   - - [rigcontrols, /home/mike/root/projects/rigcontrols]
   - - [blog, /home/mike/root/projects/profile/source]
   - - [jump-hs, /home/mike/root/projects/jump-hs]
   - - [breathe, /home/mike/root/projects/sphinx/breathe]
   - - [dojo, /home/mike/root/projects/dojo]
   - - [taglist, /home/mike/root/projects/taglist]
   - - [git.pde, /home/mike/root/projects/presentations/git]

It is a list of list of lists in which:

* **Top Level** is a list of the projects
* **Second Level** is a list of sub targets within those projects
* **Third Level** is a pair of ``name`` and ``directory``. The ``name`` is
  displayed in the user interface and the directory is what should eventually be
  written to the output file.

A Start
-------

Let's google "haskell yaml". Sweet, a `Reading Yaml in Haskell`_ question on
stackoverflow comes up first, though nothing else on the first two pages looks
like anything more than package references without further documentation. The
top answer to the question recommends the `yaml
<http://hackage.haskell.org/package/yaml>`_ and HsSyck_ modules with a slight
preference towards the former.

.. _Reading Yaml in Haskell: http://stackoverflow.com/questions/13059806/reading-yaml-in-haskell
.. _HsSyck: http://hackage.haskell.org/package/HsSyck

Reading the Yaml Data
---------------------

The `yaml module docs`_ are pretty thin for a beginner which is why I'm writing
this piece. At this stage in my Haskell journey I can't see any obvious places
to start.

From an imperative programming perspective, I would generally expect to provide
a file path, a stream or a string to some kind of function and get back a data
structure which containers all the information from the yaml file. This is might
not be suitable for incredibly large files but then yaml tends to be used for
the configuration file end of the spectrum rather than large data sets.

Checking through the functions shows ``decodeFile`` to take a file path and
return some kind of data in an IO action:

.. code-block:: haskell

   decodeFile :: FromJSON a => FilePath -> IO (Maybe a)

Ok, reasonable starting point. Let's add:

.. code-block:: haskell

   import qualified Data.Yaml as Y

To the import section and add:

.. code-block:: haskell

   results <- Y.decodeFile "jumprc"

To the top of the ``main`` do-block just to try it out.

In hindsight, I can see that those people reading along, and wondering exactly
what I thought the compiler was going to do with that ``a`` in the type
signature, were correct to be confused. However, as my naive self still learning
the language I was armed with nothing more than this error message::

   src/Main.hs:16:16:
       No instance for (Y.FromJSON a0)
         arising from a use of `Y.decodeFile'
       In a stmt of a 'do' block: results <- Y.decodeFile "jumprc"
       In the expression:
         do { results <- Y.decodeFile "jumprc";

Which frankly isn't that useful to me even now that I know the answer. I think
it is basically trying to say "I'm trying to compile this and I'm left holding
this ``Y.FromJSON a0`` thing and I've no idea what to do with it." The ``a0`` is
perhaps some kind of clue that it doesn't have enough information to figure out
all the types as there certainly isn't an ``a0`` type declared in my program.

Ok, so that type signature above? That is going to take ``FilePath`` and return
something with an specified type ``a`` which is an instance of the typeclass
``FromJSON``.  I'm still pretty clueless but yaml module docs have a ``Value``
data type which is instance of the ``FromJSON`` typeclass so we try that:

.. code-block:: haskell

    results <- Y.decodeFile "jumprc" :: IO ( Maybe Y.Value )

This works. Sweet. What can we do with it? I've no idea.

.. _yaml module docs: http://hackage.haskell.org/package/yaml-0.8.5.1/docs/Data-Yaml.html

Digging into the Yaml Data
--------------------------

I've never drilled into a Haskell data structure before. No even really sure
what it looks like. Let's simply the input data a bit and print it. New input
data in the yaml file::

   - - [sph, /home/mike/root/projects/sph]
   - - [profile, /home/mike/root/projects/profile]
     - [blog, /home/mike/root/projects/profile/blog]

Print statement:

.. code-block:: haskell

    print results

Result::

   Just (Array (fromList [Array (fromList [Array (fromList [String "sph",String
   "/home/mike/root/projects/sph"])]),Array (fromList [Array (fromList [String
   "profile",String "/home/mike/root/projects/profile"]),Array (fromList [String
   "blog",String "/home/mike/root/projects/profile/blog"])])]))

Not exactly readable but it gives us a start. First up it is wrapped in a
``Maybe`` which we should be expecting as we asked for it as ``IO ( Maybe
Y.Value )`` and then unwrapped the IO action with the ``<-`` in the do-block.
Inspecting the docs_ we can see that the ``Value`` data type as several
different constructor types include ``Array`` which as a single piece of data
which is a ``Vector`` of more yaml ``Value`` data. We can see from the Vector
docs that it is an instance of the ``Functor`` and ``Foldable`` typeclasses
along with many others which means we can do various map and fold operations
over it.

``fromList`` is documented_ as a conversion function between a list and a
``Vector``:

.. code-block:: haskell

   fromList :: [a] -> Vector a

I've yet to figure out how or why ``show``, which is what ``print`` uses,
would choose to represent a ``Vector`` as ``fromList [...]`` but it isn't
unreasonable.

Ok, so baby steps. We can remove the ``Maybe`` wrapper by writing a function and
pattern matching against the contents. So we change our code to:

.. code-block:: haskell

    results <- Y.decodeFile "jumprc" :: IO ( Maybe Y.Value )
    process results

With:

.. code-block:: haskell

   process (Just v) = print v
   process _        = return ()

And we get everything inside the ``Just`` as expected::

   Array (fromList [Array (fromList [Array (fromList [String "sph",String
   "/home/mike/root/projects/sph"])]),Array (fromList [Array (fromList [String
   "profile",String "/home/mike/root/projects/profile"]),Array (fromList [String
   "blog",String "/home/mike/root/projects/profile/blog"])])])

Makes sense. Well what if we aim to print each entry in the top array on a new
line. We can change to:

.. code-block:: haskell

   process (Just v) = processTop v
   process _        = return ()

And then implement ``processTop``. We could try something like:

.. code-block:: haskell

   processTop a = fmap ( putStrLn . show ) a

Afterall, we read above that the ``Array`` is a functor is we can map over it.
However, on compiling it complains about the return type of the second
definition of ``process``, but that's weird as we're sure that's correct. We're
just using ``return`` to create a minimal ``IO`` action with no interesting
content. So really, we're screwing up the signature of the first definition and
then the compiler is telling us that the second definition doesn't match the
first. But we want the first definition to match the second and we know what
that is so we add a type signature to tell the compiler what is meant to be
going on::

.. code-block:: haskell

   process :: Maybe a -> IO ()
   process (Just v) = processTop v
   process _        = return ()

Excellent, now it is telling us something we want to know::

   src/Main.hs:16:20:
       Couldn't match type `IO ()' with `()'
       Expected type: IO ()
         Actual type: IO (IO ())
       In the return type of a call of `processTop'
       In the expression: processTop v

I am not entirely sure what this means but I am going to avoid finding out for
the moment as that is a lot of ``IO``'s in a part of the code which could well
be pure. We're much better return a string array from ``processTop`` and
printing it in our ``process`` function than pushing our non-pure ``IO`` code
further and further into the call stack.

So we change our ``processTop`` to a dummy implementation which returns a string
array:

.. code-block:: haskell

   processTop :: Y.Value -> [String]
   processTop a = ["line one", "line two"]

And change ``process`` to print out the result by mapping ``putStrLn`` over the
result of ``processTop``. We use ``mapM_`` as it applies a function of type ``a
-> m b`` over a ``[a]`` and returns a simple empty ``IO`` action which will
print out all the lines we want:

.. code-block:: haskell

   process :: Maybe Y.Value -> IO ()
   process (Just v) = mapM_ putStrLn $ processTop v
   process _        = return ()

Great, so now we have ``processTop`` which is nice and pure and now it just
needs to actually work, y'know, rather than ignoring its inputs.

A reasonable first step would be to pattern match against the ``Array``
constructor of the ``Value`` date type as we're currently only passing a
``Value``. That will give as the actual array to play with:

.. code-block:: haskell

   processTop :: Y.Value -> [String]
   processTop (Y.Array a) = ...

Then we want to convert the data, ``a``, in that ``Array`` to a list and map
``show`` over it to convert each entry to a representative string. We saw
earlier that the data in the ``Array`` is a ``Vector`` so we grab the
appropriate module:

.. code-block:: haskell

   import qualified Data.Vector as V

And use the ``toList`` method to convert it. Then we are free to ``map``
``show`` over the result so:

.. code-block:: haskell

   processTop :: Y.Value -> [String]
   processTop (Y.Array a) = map show $ V.toList a

If we run this, we get::

   Array (fromList [Array (fromList [String "sph",String "/home/mike/roo...
   Array (fromList [Array (fromList [String "profile",String "/home/mike...

ie. one line per item in our top list. Progress.

.. _docs: http://hackage.haskell.org/package/yaml-0.8.5.1/docs/Data-Yaml.html#t:Value
.. _documented: http://hackage.haskell.org/package/vector-0.10.9.1/docs/Data-Vector.html#v:fromList

Digging Further
---------------

We're getting a bit of a hang of this, so now we should start figuring out what
we actually want to get back from this function. What would make our lives
easier for setting up this list?

It would seem reasonable to aim for a list of pairs where the pairs of the
``name`` and ``directory`` parts of the Yaml file. We would then be able to
iterate over this list and add pairs into our interface.

So we want to reduce our hierachy down to a single list of pairs. It seems
reasonable that we could use a ``fold`` to achieve this with the accumulator
being a new list which we add the pairs to.

To make things a little more readable we add some nicer types for the components
of our pairs:

.. code-block:: haskell

   type Name = String
   type Directory = String

We can then change ``processTop`` to:

.. code-block:: haskell

   processTop :: Y.Value -> [(Name, Directory)]
   processTop (Y.Array a) = V.foldl processGroup [] a

Which extracts the ``Vector`` value from the array as before and folds over
it using the ``processGroup`` function with an empty list as an accumulator.
Ultimately it aims to return a list of ``Name``-``Directory`` pairs as stated in
the new type signature.

We use ``V.foldl`` rather than ``foldl`` as this needs to operate on a ``Vector``
rather than a list. I am not sure what the ``fmap`` equivalent of ``foldl`` is,
ie. a ``foldl`` function that can be applied to any instance of the ``Foldable``
typeclass.

So, ``processGroup``? That kind of sits in the middle and doesn't do much more
than repeat the ``foldl`` on bottom level of our hierarchy:

.. code-block:: haskell

   processGroup :: [(Name,Directory)] -> Y.Value -> [(Name,Directory)]
   processGroup xs (Y.Array a) = V.foldl processPair xs a

We pass the ``xs`` list from the argument through to the fold so that we
continue to add to the same list. Otherwise we extract the ``Vector`` data from
the ``Array`` as standard and all is good. 

Then ``processPair`` does something a little more interesting:

.. code-block:: haskell

   processPair :: [(Name,Directory)] -> Y.Value -> [(Name,Directory)]
   processPair xs (Y.Array a) = case V.toList a of
      [Y.String x, Y.String y] -> ((T.unpack x, T.unpack y)):xs

We extract the ``Vector`` data, then use ``V.toList`` to convert the ``Vector``
to a standard list, and use a ``case`` statement to pattern match against the
contents accounting for the situation where it is a two element list each being
a ``Y.String`` value. In that case, we unpack the values into tuple which is
prepended to our results list.

We're now returning a ``[(Name,Directory)]`` which was can't map ``putStrLn``
over in our first ``process`` function as ``putStrLn`` expects a ``String``. So
we can change that to:

.. code-block:: haskell

   process :: Maybe Y.Value -> IO ()
   process (Just v) = mapM_ print $ processTop v
   process _        = return ()

Add run it and we get::

   ("blog","/home/mike/root/projects/profile/blog")
   ("profile","/home/mike/root/projects/profile")
   ("sph","/home/mike/root/projects/sph")

Done! A list of tuples, each with the data we're interested in.

Adding to the Interface
-----------------------

So now we're in a good place to add these entries to our UI list. We want to
replace the following hardcoded section with something which will add the
results from processing the yaml data:

.. code-block:: haskell

   addToList list "choice 1" =<< ( plainText $ T.pack "choice 1" )
   addToList list "choice 2" =<< ( plainText $ T.pack "choice 2" )

First we change ``process`` so that it no longer attempts to print out the
results and just returns them:

.. code-block:: haskell

   process :: Maybe Y.Value -> [(Name,Directory)]
   process (Just v) = processTop v

This means it does little more than extract the data from the ``Maybe`` and pass
it to ``processTop`` to be processed.

We then create a binding for our processed list of pairs in our ``main``
do-block for easy reading:

.. code-block:: haskell

   let pairs = process results

Then we want to add each pair in this list to our UI list. We know that the
line:

.. code-block:: haskell

   addToList list "choice 1" =<< ( plainText $ T.pack "choice 1" )

Produces some kind of ``IO``, probably empty as we're not attempting to use the
result. So if we're going to map over our pairs list, which seems reasonable to
handle each result, then we're going to want to ``mapM_`` as we did before so
that we collect these ``IO`` actions together properly and then ignore their
return.

So we can:

.. code-block:: haskell

   let pairs = process results
   mapM_ (addPairsToList list) pairs

Where ``addPairsToList`` is curried with the UI list widget to make it available
during the mapping. We implement ``addPairsToList`` as:

.. code-block:: haskell

   addPairsToList :: Widget (List Directory FormattedText) -> (Name, Directory) -> IO ()
   addPairsToList list (name, dir) = addToList list dir =<< ( plainText $ T.pack name )

Which is a fairly direct resuse of the ``addToList`` usage we had before which
came from the vty-ui documentation. We pattern match the input to get the
``name`` and ``directory`` from the pair and use them in their appropriate
locations.

Finished
--------

Well, not really. Further works needs to be done to write the list choice into a
file when the user selects it and to allow vim style ``j/k`` navigation of the
list for my old habits. And it would be polite to add some error checking as
this is pretty much devoid of it. Still, we've done the yaml bit which is what
we came here to do. The final code as we have written it so far looks like:

.. code-block:: haskell

   import           Graphics.Vty.Widgets.All

   import           Graphics.Vty.Attributes ( def_attr )
   import           Graphics.Vty.LLInput    ( Key( KASCII) )

   import           System.Exit ( exitSuccess )

   import qualified Data.Text as T

   import qualified Data.Yaml as Y

   import qualified Data.Vector as V

   type Name = String
   type Directory = String

   processPair :: [(Name,Directory)] -> Y.Value -> [(Name,Directory)]
   processPair xs (Y.Array a) = case V.toList a of
       [Y.String x, Y.String y] -> ((T.unpack x, T.unpack y)):xs

   processGroup :: [(Name,Directory)] -> Y.Value -> [(Name,Directory)]
   processGroup xs (Y.Array a) = foldl processPair xs $ V.toList a

   processTop :: Y.Value -> [(Name,Directory)]
   processTop (Y.Array a) = V.foldl processGroup [] a

   process :: Maybe Y.Value -> [(Name,Directory)]
   process (Just v) = processTop v

   addPairsToList :: Widget (List Directory FormattedText) -> (Name, Directory) -> IO ()
   addPairsToList list (name, dir) = addToList list dir =<< ( plainText $ T.pack name )

   main :: IO ()
   main = do

       results <- Y.decodeFile "jumprc" :: IO ( Maybe Y.Value )

       -- Create new list
       list <- newList def_attr

       -- -- Populate options
       let pairs = process results
       mapM_ (addPairsToList list) pairs

       ui <- centered list

       fg <- newFocusGroup
       addToFocusGroup fg list

       c <- newCollection
       _ <- addToCollection c ui fg

       -- Focus group event handlers
       fg `onKeyPressed` exit

       runUi c defaultContext

   -- Callback for exiting via 'q'
   exit _ key _ | key == KASCII 'q' = do { shutdownUi; exitSuccess }
                | otherwise         = return False

I hope this meandering ramble of a post has been useful. It has cleared up some
issues for me and I hope it will help some people in the early stages of their
Haskell journey to see something broken down like this.



