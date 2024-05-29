# Preval test case

# finally_catch_finally_bad2.md

> Ref tracking > Finally catch finally bad2
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
      // Any throw is _guaranteed_ to be caught here...
      x = 8; // There's no real world case where this assignment could throw
    }
  } finally {
    $(x);                       // x=1 [2 3 4 5 6 7] 8
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
    x___70__ = 8;
  }
} finally /*71*/ {
  $(x___75__);
  x___79__ = 9;
}
$(x___83__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,75       | none           | 15,79
  - r @11      | 4
  - w @15      | ########## | 21,75       | 4              | 25,70,79
  - r @21      | 15
  - w @25      | ########## | 31,51,75    | 15             | 35,55,70,79
  - r @31      | 25
  - w @35      | ########## | 51,75       | 25             | 46,55,70,79
  - w @46      | ########## | 51,75       | 35             | 55,70,79
  - r @51      | 25,35,46
  - w @55      | ########## | 59,75       | 25,35,46       | 63,70,79
  - r @59      | 55
  - w @63      | ########## | 75          | 55             | 70,79
  - w @70      | ########## | 75          | 15,25,35,46,55,63 | 79
  - r @75      | 4,15,25,35,46,55,63,70
  - w @79      | ########## | 83          | 4,15,25,35,46,55,63,70 | none
  - r @83      | 79
