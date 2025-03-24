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
let x___6__ = 1;
let $implicitThrow$1___9__ = false;
let $finalCatchArg$1___12__ = undefined___13__;
try /*15*/ {
  $(x___19__);
  x___23__ = 2;
  try /*25*/ {
    $(x___33__);
    x___37__ = 3;
    let $implicitThrow___39__ = false;
    let $finalStep___42__ = false;
    let $finalCatchArg___45__ = undefined___46__;
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
        $(x___88__);
        x___92__ = 6;
        throw $finalImplicit___94__;
      }
    }
    $(x___98__);
    x___102__ = 6;
    if ($implicitThrow___104__) {
      /*105*/ throw $finalCatchArg___107__;
    } /*108*/ else {
      if ($finalStep___110__) {
        /*111*/ throw $finalArg___113__;
      } /*114*/ else {
        $(x___118__);
        x___122__ = 7;
      }
    }
  } catch (e___124__) /*125*/ {
    x___129__ = 8;
  }
} catch ($finalImplicit$1___131__) /*132*/ {
  $(x___136__);
  x___140__ = 9;
  throw $finalImplicit$1___142__;
}
$(x___146__);
x___150__ = 9;
if ($implicitThrow$1___152__) {
  /*153*/ throw $finalCatchArg$1___155__;
} /*156*/ else {
  $(x___160__);
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 19,136      | none           | 23,140
  - r @19      | 6
  - w @23      | ########## | 33,136      | 6              | 37,129,140
  - r @33      | 23
  - w @37      | ########## | 58,88,136   | 23             | 62,92,129,140
  - r @58      | 37
  - w @62      | ########## | 88,98,136   | 37             | 81,92,102,129,140
  - w @81      | ########## | 88,98,136   | 62             | 92,102,129,140
  - r @88      | 37,62,81
  - w @92      | ########## | 136         | 37,62,81       | 129,140
  - r @98      | 62,81
  - w @102     | ########## | 118,136     | 62,81          | 122,129,140
  - r @118     | 102
  - w @122     | ########## | 136,146     | 102            | 129,140,150
  - w @129     | ########## | 136,146     | 23,37,62,81,92,102,122 | 140,150
  - r @136     | 6,23,37,62,81,92,102,122,129
  - w @140     | ########## | not read    | 6,23,37,62,81,92,102,122,129 | none
  - r @146     | 122,129
  - w @150     | ########## | 160         | 122,129        | none
  - r @160     | 150

$implicitThrow$1:
  - w @9             | ########## | 152         | none           | none
  - r @152           | 9

$finalCatchArg$1:
  - w @12            | ########## | 155         | none           | none
  - r @155           | 12

$implicitThrow:
  - w @39            | ########## | 104         | none           | none
  - r @104           | 39

$finalStep:
  - w @42            | ########## | 110         | none           | 69
  - w @69            | ########## | 110         | 42             | none
  - r @110           | 42,69

$finalCatchArg:
  - w @45            | ########## | 107         | none           | none
  - r @107           | 45

$finalArg:
  - w @48            | ########## | 113         | none           | 74
  - w @74            | ########## | 113         | 48             | none
  - r @113           | 48,74
