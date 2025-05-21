# Preval test case

# finally_catch_finally.md

> Ref tracking > Done > Try-finally > Finally catch finally

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);       // x=1
  x = 2;
  try {
    $(x);     // x=2
    x = 3;
  } finally {
    $(x);     // x=2 3
    x = 4;
  }
} catch {
  $(x);       // x=1 2 3 4
  x = 5;
} finally {
  $(x);       // x=1 2 3 4 5
}
$(x);         // x=4 5
`````


## Output

(Annotated with pids)

`````filename=intro
let x___6__ = 1;
let $implicitThrow$1___9__ = false;
let $finalCatchArg$1___12__ = undefined___13__;
try /*15*/ {
  $(x___21__);
  x___25__ = 2;
  let $implicitThrow___27__ = false;
  let $finalCatchArg___30__ = undefined___31__;
  try /*33*/ {
    $(x___37__);
    x___41__ = 3;
  } catch ($finalImplicit___43__) /*44*/ {
    $(x___48__);
    x___52__ = 4;
    throw $finalImplicit___54__;
  }
  $(x___58__);
  x___62__ = 4;
  if ($implicitThrow___64__) {
    /*65*/ throw $finalCatchArg___67__;
  } /*68*/ else {
  }
} catch (e___70__) /*71*/ {
  try /*73*/ {
    $(x___77__);
    x___81__ = 5;
  } catch ($finalImplicit$1___83__) /*84*/ {
    $(x___88__);
    throw $finalImplicit$1___90__;
  }
}
$(x___94__);
if ($implicitThrow$1___96__) {
  /*97*/ throw $finalCatchArg$1___99__;
} /*100*/ else {
  $(x___104__);
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 21,77,88    | none           | 25,81
  - r @21      | 6
  - w @25      | ########## | 37,48,77,88 | 6              | 41,52,81
  - r @37      | 25
  - w @41      | ########## | 48,58,77,88 | 25             | 52,62,81
  - r @48      | 25,41
  - w @52      | ########## | 77,88       | 25,41          | 81
  - r @58      | 41
  - w @62      | ########## | 77,88,94,104 | 41             | 81
  - r @77      | 6,25,41,52,62
  - w @81      | ########## | 88,94,104   | 6,25,41,52,62  | none
  - r @88      | 6,25,41,52,62,81
  - r @94      | 62,81
  - r @104     | 62,81

$implicitThrow$1:
  - w @9             | ########## | 96          | none           | none
  - r @96            | 9

$finalCatchArg$1:
  - w @12            | ########## | 99          | none           | none
  - r @99            | 12

$implicitThrow:
  - w @27            | ########## | 64          | none           | none
  - r @64            | 27

$finalCatchArg:
  - w @30            | ########## | 67          | none           | none
  - r @67            | 30

$finalImplicit:
  - w @43            | ########## | 54          | none           | none
  - r @54            | 43

e:
  - w @70            | ########## | not read    | none           | none

$finalImplicit$1:
  - w @83            | ########## | 90          | none           | none
  - r @90            | 83
