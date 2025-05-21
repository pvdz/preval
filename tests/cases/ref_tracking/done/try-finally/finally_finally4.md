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
let x___8__ = 1;
let $implicitThrow$1___11__ = false;
let $finalStep___14__ = false;
let $finalCatchArg$1___17__ = undefined___18__;
let $finalArg___20__ = undefined___21__;
$finally$1___23__: /*24*/ {
  try /*26*/ {
    $(x___32__);
    x___36__ = 2;
    let $implicitThrow___38__ = false;
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


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @8       | ########## | 32,96       | none           | 36
  - r @32      | 8
  - w @36      | ########## | 48,67,96    | 8              | 52,71
  - r @48      | 36
  - w @52      | ########## | 67,96       | 36             | 71
  - r @67      | 36,52
  - w @71      | ########## | 75,96,102,118 | 36,52          | none
  - r @75      | 71
  - r @96      | 8,36,52,71
  - r @102     | 71
  - r @118     | 71

$implicitThrow$1:
  - w @11            | ########## | 104         | none           | none
  - r @104           | 11

$finalStep:
  - w @14            | ########## | 110         | none           | 82
  - w @82            | ########## | 110         | 14             | none
  - r @110           | 14,82

$finalCatchArg$1:
  - w @17            | ########## | 107         | none           | none
  - r @107           | 17

$finalArg:
  - w @20            | ########## | 113         | none           | 86
  - w @86            | ########## | 113         | 20             | none
  - r @113           | 20,86

$implicitThrow:
  - w @38            | ########## | 77          | none           | 59
  - w @59            | ########## | 77          | 38             | none
  - r @77            | 38,59

$finalCatchArg:
  - w @41            | ########## | 85          | none           | 63
  - w @63            | ########## | 85          | 41             | none
  - r @85            | 41,63

$finalImplicit:
  - w @54            | ########## | 62          | none           | none
  - r @62            | 54

$finalImplicit$1:
  - w @91            | ########## | 98          | none           | none
  - r @98            | 91
