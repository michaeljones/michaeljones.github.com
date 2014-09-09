
Remove Chunks from Your Last Commit
===================================

:date: 2014-09-09
:category: article
:tags: git

I tend to use ``git add -p`` most of the time as I enjoy the granular control
over what I am commiting and it allows me to accummulate additional changes, as
I work, confident that I can commit them separately for a pleasing history.

Sometimes, however, I am not concentrating and I either do a straight ``git
commit`` when I think I can get away with it but can't, or I do ``git add -p``
and accept the wrong thing before commiting. Either way, I end up with a commit
that has some changes, or chunks, in it that I don't want.

Up until recently, I have been doing a ``git reset HEAD^`` to completely undo
the commit and start again. This is a bit of a pain and feels somewhat
ponderous.

I would rather generate a pair of patches: one which removes the chunks for the
last commit and one which adds them as a new commit. This can be awkwardly
managed by dancing around with ``git revert`` and ``git reset``, but I have just
realised it can be more cleanly achieved with::

    git reset -p HEAD^

Then selecting the chunks you want to revert. This perfectly creates staged
changes that undo the chunks and unstaged changes which redo them. You can
then::

    git commit --amend

To commit the staged chunks that remove the targetted changes from the previous
commit and then::

    git commit -a

To commit the removed changes as a new separate commit. Or if they should be
split over multiple commits, use ``git commit -p`` otherwise you'll be back
to square one.


