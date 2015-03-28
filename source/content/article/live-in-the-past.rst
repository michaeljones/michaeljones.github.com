
Source Control: Live in the Past
================================

:date: 2015-03-28
:category: article
:tags: git

I am going to propose that there are two broad ways of using source control and
that developers generally fall into one camp or the other. The two ways are:

- Some developers view source control as a kind of back up mechanism quite like
  making regular copies of your project. Useful in case you screw up your
  current code base and you have to go back and recover some kind of reasonable
  state of the code.

  What is important about these back ups is that they exist and that the latest
  one is recent enough that restoring from it isn't going to be a massive pain.

  These developers live in the present.

- Other developers view source control as the story of their project with a
  feeling that the whole story is required for full understanding. The major
  events and the minor details of the past are important if not quite as
  important as the current state of the code.

  These developers live in the past.

I identify more with the second group and sometimes struggle when working with
developers from the first group.


Symptoms of Living in the Present
---------------------------------

These are the symptoms I see of living in the present in a source control sense:

1. **Weak commit messages**

   If you only really value the current state of your code base then commit
   messages have no meaning. Why carefully document the last back up you made?
   Back up services don't do that. They timestamp the back ups so that you know
   which is the latest. Maybe you can make an educated guess at going back
   further if the latest is flawed but backups should be automatic and in the
   background. Don't ask me for a commit message.

   And this shows in commit messages from these developers. They become cursory
   and dismissive. Sometimes only one word or a few, sometimes only referencing
   a ticket with no further explanation. [1]

2. **Commiting commented out code**

   If the commit history is out of the picture then it isn't a safe place for
   code that might be useful some day. Best not delete the code, but instead
   comment it out so that it is available for future developers.

3. **Commiting debug code**

   If the current state of the code base is all that matters then the diff with
   the previous state is not relevant. You've made your changes and it works so
   commit them. The code works and it didn't before so it is time to move on.

   It can lead to you commiting print statements and debug code as there is
   little incentive to check over the diff you are creating in your commit.

4. **Messy branching history**

   Again, if history doesn't matter then why pay any attention to how you are
   interacting with it. Pull the latest code and run whatever commands you have
   to to get to a point where you can push you code back. What matters is your
   code and the changes you've made not what else you might have pulled in.


Personal Experience
-------------------

I used work in the present as it were. For at least a year or so, I worked with
centralised source control systems and didn't pay much attention to the history
of the project. I was new to the tools and was learning my way around the core
commands necessary to work with the system and get far beyond ``update`` and
``commit``.

I think that a strong influence was the lack of easy branching centralised
version control systems. If you're never branching then ``update`` and
``commit`` might be all you really need to know. The cutting edge of the project
development is a point, not an 'edge' at all. You only have to be aware of that
one state because that is the only place where development was going on. The
``update`` command got you the latest changes and ``commit`` sent your back.

The world changed a little when shifting to git. First the easy branching meant
numerous local branches which called for better visualisation. A single thread
of development doesn't need to be visualised but in multiple threads everything
is suddenly relative. You know the changes you've made but when and where? How
were they going to be combined again. I began to rely on ``gitk`` as a quick and
simple viewer for the state of my repository. I used it to track my branches but
what it showed me was the history. There it was laid out before me; an extra
dimension that I hadn't looked at before.

Suddenly your collorators changes aren't just a bump to ``update`` over, they
are visible individual commits with diffs & messages. A timeline of progress and
reason which can be read and understood.

If only they didn't have terrible commit messages. Suddenly you start looking at
diffs and wanting to know why those changes are being made. Diffs rarely make
much sense without context and those messages provide a change to understand and
to learn.

So now I live in the past. Gitk is my home.


Symptoms of Living in the Past
------------------------------

I'll attempt to provide a little balance. Obviously I feel there are good
symptoms of living in the past. Namely the opposite of those I've listed above
but there is a bad one as well.

1. **Endlessly massaging commits**


[1]: My personal experience with this kind of thinking is my memory of my early
     confused days working with RCS. For commit messages in RCS you had to enter
     a '.' on a new line to finish the message. I approached this as 'you have
     to enter a dot on a new line to make it go away.' It was like learning the
     key I had to press to get past this thing that was blocking my progress.
     The purpose of the step didn't cross my mind.

[2]: I am a little sympathetic towards this though I don't agree with it as a
     practice. If I see some code that needs to be improved in some way I don't
     scan the entire history of that part of the code in source control to see
     possible past attempts that might need to be resurrected.

     That said, I think the middle ground here is to leave a comment documenting
     previous approaches so that future developers know to look back if they
     decide something similar is needed once more.

