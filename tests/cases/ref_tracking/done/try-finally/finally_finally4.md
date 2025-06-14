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
let /*___8__*/ x = 1;
let /*___11__*/ $implicitThrow$1 = false;
let /*___14__*/ $finalStep = false;
let /*___17__*/ $finalCatchArg$1 = /*___18__*/ undefined;
let /*___20__*/ $finalArg = /*___21__*/ undefined;
/*___23__*/ $finally$1: /*24~98*/ {
  try /*26~89*/ {
    $(/*___32__*/ x);
    /*___36__*/ x = 2;
    let /*___38__*/ $implicitThrow = false;
    let /*___41__*/ $finalCatchArg = /*___42__*/ undefined;
    try /*44~52*/ {
      $(/*___48__*/ x);
      /*___52__*/ x = 3;
    } catch (/*___54__*/ $finalImplicit) /*55~63*/ {
      /*___59__*/ $implicitThrow = true;
      /*___63__*/ $finalCatchArg = /*___62__*/ $finalImplicit;
    }
    $(/*___67__*/ x);
    /*___71__*/ x = 4;
    $(/*___75__*/ x);
    if (/*___77__*/ $implicitThrow) {
      /*78~88*/ /*___82__*/ $finalStep = true;
      /*___86__*/ $finalArg = /*___85__*/ $finalCatchArg;
      break /*___88__*/ $finally$1;
    } /*89~89*/ else {
    }
  } catch (/*___91__*/ $finalImplicit$1) /*92~98*/ {
    $(/*___96__*/ x);
    throw /*___98__*/ $finalImplicit$1;
  }
}
$(/*___102__*/ x);
if (/*___104__*/ $implicitThrow$1) {
  /*105~107*/ throw /*___107__*/ $finalCatchArg$1;
} /*108~118*/ else {
  if (/*___110__*/ $finalStep) {
    /*111~113*/ throw /*___113__*/ $finalArg;
  } /*114~118*/ else {
    $(/*___118__*/ x);
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
