# Preval test case

# finally_catch_finally_bad2.md

> Ref tracking > Done > Try-random > Finally catch finally bad2
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
let $implicitThrow$1___8__ = false;
let $finalCatchArg$1___12__ = undefined___13__;
try /*15*/ {
  $(x___19__);
  x___23__ = 2;
  try /*25*/ {
    $(x___29__);
    x___33__ = 3;
    let $implicitThrow___36__ = false;
    let $finalStep___40__ = false;
    let $finalCatchArg___44__ = undefined___45__;
    let $finalArg___48__ = undefined___49__;
    $finally___51__: /*52*/ {
      try /*54*/ {
        $(x___58__);
        x___62__ = 4;
        if ($) {
          /*65*/ $finalStep___69__ = true;
          $finalArg___74__ = `x`;
          break $finally___76__;
        } /*77*/ else {
          x___81__ = 5;
        }
      } catch ($finalImplicit___83__) /*84*/ {
        $implicitThrow___88__ = true;
        $finalCatchArg___92__ = $finalImplicit___91__;
      }
    }
    $(x___96__);
    x___100__ = 6;
    if ($implicitThrow___102__) {
      /*103*/ throw $finalCatchArg___105__;
    } /*106*/ else {
      if ($finalStep___108__) {
        /*109*/ throw $finalArg___111__;
      } /*112*/ else {
        $(x___116__);
        x___120__ = 7;
      }
    }
  } catch (e___122__) /*123*/ {
    x___127__ = 8;
  }
} catch ($finalImplicit$1___129__) /*130*/ {
  $implicitThrow$1___134__ = true;
  $finalCatchArg$1___138__ = $finalImplicit$1___137__;
}
$(x___142__);
x___146__ = 9;
if ($implicitThrow$1___148__) {
  /*149*/ throw $finalCatchArg$1___151__;
} /*152*/ else {
  $(x___156__);
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,142      | none           | 23,146
  - r @19      | 4
  - w @23      | ########## | 29,142      | 4              | 33,127,146
  - r @29      | 23
  - w @33      | ########## | 58,96,142   | 23             | 62,100,127,146
  - r @58      | 33
  - w @62      | ########## | 96,142      | 33             | 81,100,127,146
  - w @81      | ########## | 96,142      | 62             | 100,127,146
  - r @96      | 33,62,81
  - w @100     | ########## | 116,142     | 33,62,81       | 120,127,146
  - r @116     | 100
  - w @120     | ########## | 142         | 100            | 127,146
  - w @127     | ########## | 142         | 23,33,62,81,100,120 | 146
  - r @142     | 4,23,33,62,81,100,120,127
  - w @146     | ########## | 156         | 4,23,33,62,81,100,120,127 | none
  - r @156     | 146

$implicitThrow$1:
  - w @8             | ########## | 148         | none           | 134
  - w @134           | ########## | 148         | 8              | none
  - r @148           | 8,134

$finalCatchArg$1:
  - w @12            | ########## | 151         | none           | 138
  - w @138           | ########## | 151         | 12             | none
  - r @151           | 12,138

$implicitThrow:
  - w @36            | ########## | 102         | none           | 88
  - w @88            | ########## | 102         | 36             | none
  - r @102           | 36,88

$finalStep:
  - w @40            | ########## | 108         | none           | 69
  - w @69            | ########## | 108         | 40             | none
  - r @108           | 40,69

$finalCatchArg:
  - w @44            | ########## | 105         | none           | 92
  - w @92            | ########## | 105         | 44             | none
  - r @105           | 44,92

$finalArg:
  - w @48            | ########## | 111         | none           | 74
  - w @74            | ########## | 111         | 48             | none
  - r @111           | 48,74
