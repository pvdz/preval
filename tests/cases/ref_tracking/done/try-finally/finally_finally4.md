# Preval test case

# finally_finally4.md

> Ref tracking > Done > Try-finally > Finally finally4

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
    $(x);     // x=4
  }
} finally {
  $(x);       // x=1 2 3 4
}
$(x);         // x=4
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
let $implicitThrow$1___8__ = false;
let $finalStep___12__ = false;
let $finalCatchArg$1___16__ = undefined___17__;
let $finalArg___20__ = undefined___21__;
$finally$1___23__: /*24*/ {
  try /*26*/ {
    $(x___30__);
    x___34__ = 2;
    let $implicitThrow___37__ = false;
    let $finalCatchArg___41__ = undefined___42__;
    try /*44*/ {
      $(x___48__);
      x___52__ = 3;
    } catch ($finalImplicit___54__) /*55*/ {
      $implicitThrow___59__ = true;
      $finalCatchArg___63__ = $finalImplicit___62__;
    }
    $(x___67__);
    x___71__ = 4;
    $(x___75__);
    if ($implicitThrow___77__) {
      /*78*/ $finalStep___82__ = true;
      $finalArg___86__ = $finalCatchArg___85__;
      break $finally$1___88__;
    } /*89*/ else {
    }
  } catch ($finalImplicit$1___91__) /*92*/ {
    $(x___96__);
    throw $finalImplicit$1___98__;
  }
}
$(x___102__);
if ($implicitThrow$1___104__) {
  /*105*/ throw $finalCatchArg$1___107__;
} /*108*/ else {
  if ($finalStep___110__) {
    /*111*/ throw $finalArg___113__;
  } /*114*/ else {
    $(x___118__);
  }
}
`````


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 30,96       | none           | 34
  - r @30      | 4
  - w @34      | ########## | 48,67,96    | 4              | 52,71
  - r @48      | 34
  - w @52      | ########## | 67,96       | 34             | 71
  - r @67      | 34,52
  - w @71      | ########## | 75,96,102,118 | 34,52          | none
  - r @75      | 71
  - r @96      | 4,34,52,71
  - r @102     | 71
  - r @118     | 71

$implicitThrow$1:
  - w @8             | ########## | 104         | none           | none
  - r @104           | 8

$finalStep:
  - w @12            | ########## | 110         | none           | 82
  - w @82            | ########## | 110         | 12             | none
  - r @110           | 12,82

$finalCatchArg$1:
  - w @16            | ########## | 107         | none           | none
  - r @107           | 16

$finalArg:
  - w @20            | ########## | 113         | none           | 86
  - w @86            | ########## | 113         | 20             | none
  - r @113           | 20,86

$implicitThrow:
  - w @37            | ########## | 77          | none           | 59
  - w @59            | ########## | 77          | 37             | none
  - r @77            | 37,59

$finalCatchArg:
  - w @41            | ########## | 85          | none           | 63
  - w @63            | ########## | 85          | 41             | none
  - r @85            | 41,63
