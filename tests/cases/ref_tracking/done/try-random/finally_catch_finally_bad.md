# Preval test case

# finally_catch_finally_bad.md

> Ref tracking > Done > Try-random > Finally catch finally bad
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
    $(x___129__);
    x___133__ = 8;
  }
} catch ($finalImplicit$1___135__) /*136*/ {
  $(x___140__);
  x___144__ = 9;
  throw $finalImplicit$1___146__;
}
$(x___150__);
x___154__ = 9;
if ($implicitThrow$1___156__) {
  /*157*/ throw $finalCatchArg$1___159__;
} /*160*/ else {
  $(x___164__);
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 19,140      | none           | 23,144
  - r @19      | 6
  - w @23      | ########## | 33,129,140  | 6              | 37,133,144
  - r @33      | 23
  - w @37      | ########## | 58,88,129,140 | 23             | 62,92,133,144
  - r @58      | 37
  - w @62      | ########## | 88,98,129,140 | 37             | 81,92,102,133,144
  - w @81      | ########## | 88,98,129,140 | 62             | 92,102,133,144
  - r @88      | 37,62,81
  - w @92      | ########## | 129,140     | 37,62,81       | 133,144
  - r @98      | 62,81
  - w @102     | ########## | 118,129,140 | 62,81          | 122,133,144
  - r @118     | 102
  - w @122     | ########## | 129,140,150 | 102            | 133,144,154
  - r @129     | 23,37,62,81,92,102,122
  - w @133     | ########## | 140,150     | 23,37,62,81,92,102,122 | 144,154
  - r @140     | 6,23,37,62,81,92,102,122,133
  - w @144     | ########## | not read    | 6,23,37,62,81,92,102,122,133 | none
  - r @150     | 122,133
  - w @154     | ########## | 164         | 122,133        | none
  - r @164     | 154

$implicitThrow$1:
  - w @9             | ########## | 156         | none           | none
  - r @156           | 9

$finalCatchArg$1:
  - w @12            | ########## | 159         | none           | none
  - r @159           | 12

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

$finalImplicit:
  - w @83            | ########## | 94          | none           | none
  - r @94            | 83

e:
  - w @124           | ########## | not read    | none           | none

$finalImplicit$1:
  - w @135           | ########## | 146         | none           | none
  - r @146           | 135
