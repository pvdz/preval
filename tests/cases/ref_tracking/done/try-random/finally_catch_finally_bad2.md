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
let /*___6__*/ x = 1;
let /*___9__*/ $implicitThrow$1 = false;
let /*___12__*/ $finalCatchArg$1 = /*___13__*/ undefined;
try /*15~129*/ {
  $(/*___19__*/ x);
  /*___23__*/ x = 2;
  try /*25~122*/ {
    $(/*___33__*/ x);
    /*___37__*/ x = 3;
    let /*___39__*/ $implicitThrow = false;
    let /*___42__*/ $finalStep = false;
    let /*___45__*/ $finalCatchArg = /*___46__*/ undefined;
    let /*___48__*/ $finalArg = /*___49__*/ undefined;
    /*___51__*/ $finally: /*52~94*/ {
      try /*54~81*/ {
        $(/*___58__*/ x);
        /*___62__*/ x = 4;
        if ($) {
          /*65~76*/ /*___69__*/ $finalStep = true;
          /*___74__*/ $finalArg = `x`;
          break /*___76__*/ $finally;
        } /*77~81*/ else {
          /*___81__*/ x = 5;
        }
      } catch (/*___83__*/ $finalImplicit) /*84~94*/ {
        $(/*___88__*/ x);
        /*___92__*/ x = 6;
        throw /*___94__*/ $finalImplicit;
      }
    }
    $(/*___98__*/ x);
    /*___102__*/ x = 6;
    if (/*___104__*/ $implicitThrow) {
      /*105~107*/ throw /*___107__*/ $finalCatchArg;
    } /*108~122*/ else {
      if (/*___110__*/ $finalStep) {
        /*111~113*/ throw /*___113__*/ $finalArg;
      } /*114~122*/ else {
        $(/*___118__*/ x);
        /*___122__*/ x = 7;
      }
    }
  } catch (/*___124__*/ e) /*125~129*/ {
    /*___129__*/ x = 8;
  }
} catch (/*___131__*/ $finalImplicit$1) /*132~142*/ {
  $(/*___136__*/ x);
  /*___140__*/ x = 9;
  throw /*___142__*/ $finalImplicit$1;
}
$(/*___146__*/ x);
/*___150__*/ x = 9;
if (/*___152__*/ $implicitThrow$1) {
  /*153~155*/ throw /*___155__*/ $finalCatchArg$1;
} /*156~160*/ else {
  $(/*___160__*/ x);
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

$finalImplicit:
  - w @83            | ########## | 94          | none           | none
  - r @94            | 83

e:
  - w @124           | ########## | not read    | none           | none

$finalImplicit$1:
  - w @131           | ########## | 142         | none           | none
  - r @142           | 131
