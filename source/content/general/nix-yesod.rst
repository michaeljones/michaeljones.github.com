
Nix & Yesod
===========

:date: 2014-10-26
:category: blog
:tags: nix, haskell, yesod

I've spent the day messing around with the Nix package manager and trying to get
a basic Yesod project up a running.

I very much like what I've managed to understand but it is early days and not
everything is clear. So for those attempting similar things I thought I would
share the ``default.nix`` file contents that I ended up with. Set up a folder
with this and run ``nix-shell`` and you should be able to run ``yesod init`` and
``yesod devel`` in the resulting environment.

No promises though as I've no idea what I'm doing::

   { haskellPackages ? (import <nixpkgs> {}).haskellPackages }:

   let inherit (haskellPackages);

   in with haskellPackages; cabal.mkDerivation (self: {
     pname = "project-name";
     version = "0.0.1";
     src = ./.;
     buildDepends = with haskellPackages; [
       yesod yesodStatic yesodTest
       yesodBin
       hjsmin persistentSqlite hspec
       ];
   })

Update: Tweaked to support ``yesod test`` as well.

