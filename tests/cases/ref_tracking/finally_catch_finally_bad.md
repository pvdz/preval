# Preval test case

# finally_catch_finally_bad.md

> Ref tracking > Finally catch finally bad
>
> Trying to capture a case where a throw is supposedly trapped by a Finally when it is actually caught by
> a Catch (which we ignore).
> It's difficult because we actually don't really care about any of these. But we do schedule an implicit-throw
> and those are going to traverse through the continuation engine...

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  try {
    $(x);                       // x=1
    x = 2;
    try {
      $(x);                     // x=2
      x = 3;
      try {
        $(x);                   // x=3
        x = 4;
        if ($) throw 'x';       // this should be caught by the catch, but we ignore this so it says it can reach the outer finally (which it cant)
        x = 5;
      } finally {
        $(x);                   // x=3 4 5
        x = 6;
      }
      $(x);                     // x=6
      x = 7;
    } catch {
      // Note: this call can throw and then all these values are still visible to the outer finally
      $(x);                     // x=2 3 4 5 6 7
      x = 8;
    }
  } finally {
    $(x);                       // x=1 2 3 4 5 6 7 8
    x = 9;
  }
  $(x);                         // x=9 (rest are throws)
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
  try /*17*/ {
    $(x___21__);
    x___25__ = 3;
    try /*27*/ {
      $(x___31__);
      x___35__ = 4;
      if ($) {
        /*38*/ throw `x`;
      } /*42*/ else {
        x___46__ = 5;
      }
    } finally /*47*/ {
      $(x___51__);
      x___55__ = 6;
    }
    $(x___59__);
    x___63__ = 7;
  } catch (e___65__) /*66*/ {
    $(x___70__);
    x___74__ = 8;
  }
} finally /*75*/ {
  $(x___79__);
  x___83__ = 9;
}
$(x___87__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,79       | none           | 15,83
  - r @11      | 4
  - w @15      | ########## | 21,70,79    | 4              | 25,74,83
  - r @21      | 15
  - w @25      | ########## | 31,51,70,79 | 15             | 35,55,74,83
  - r @31      | 25
  - w @35      | ########## | 51,70,79    | 25             | 46,55,74,83
  - w @46      | ########## | 51,70,79    | 35             | 55,74,83
  - r @51      | 25,35,46
  - w @55      | ########## | 59,70,79    | 25,35,46       | 63,74,83
  - r @59      | 55
  - w @63      | ########## | 70,79       | 55             | 74,83
  - r @70      | 15,25,35,46,55,63
  - w @74      | ########## | 79          | 15,25,35,46,55,63 | 83
  - r @79      | 4,15,25,35,46,55,63,74
  - w @83      | ########## | 87          | 4,15,25,35,46,55,63,74 | none
  - r @87      | 83
