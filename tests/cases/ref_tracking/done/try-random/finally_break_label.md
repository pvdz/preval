# Preval test case

# finally_break_label.md

> Ref tracking > Done > Try-random > Finally break label
>
> Breaking through a finally

## Options

- refTest

## Input

`````js filename=intro
let x = $(1);
if (x) {
  $(x);
  x = $(2);
  here: {
    $(x);
    x = $(3);
    try {
      $(x);
      if (x) {
        x = $(4);
        break here;     // (jumps to x=8 through the finally)
      }                 // <-- we are here
      x = $(5);
    } finally {
      $(x);             // x=3 4 5
      x = $(6);         // always visited (!)
    }
    $(x);               // x=6
    x = $(7);           // reachable (preval can't know it can't be)
  }
  $(x);                 // x=6 7
  x = $(8);             // always visited
}
$(x);                   // x=1 8
x = $(9);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
if (x___9__) {
  /*10*/ here___12__: /*13*/ {
    $(x___20__);
    x___26__ = $(2);
    $(x___30__);
    x___36__ = $(3);
    let $implicitThrow___38__ = false;
    let $finalStep___41__ = false;
    let $finalCatchArg___44__ = undefined___45__;
    $finally___47__: /*48*/ {
      try /*50*/ {
        $(x___54__);
        if (x___56__) {
          /*57*/ x___63__ = $(4);
          $finalStep___67__ = true;
          break $finally___69__;
        } /*70*/ else {
          x___76__ = $(5);
        }
      } catch ($finalImplicit___78__) /*79*/ {
        $implicitThrow___83__ = true;
        $finalCatchArg___87__ = $finalImplicit___86__;
      }
    }
    $(x___91__);
    x___97__ = $(6);
    if ($implicitThrow___99__) {
      /*100*/ throw $finalCatchArg___102__;
    } /*103*/ else {
      if ($finalStep___105__) {
        /*106*/ break here___108__;
      } /*109*/ else {
        $(x___113__);
        x___119__ = $(7);
      }
    }
  }
  $(x___123__);
  x___129__ = $(8);
  $(x___133__);
} /*134*/ else {
  $(x___138__);
}
x___144__ = $(9);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,20,138    | none           | 26,144
  - r @9       | 4
  - r @20      | 4
  - w @26      | ########## | 30          | 4              | 36
  - r @30      | 26
  - w @36      | ########## | 54,56,91    | 26             | 63,76,97
  - r @54      | 36
  - r @56      | 36
  - w @63      | ########## | 91          | 36             | 97
  - w @76      | ########## | 91          | 36             | 97
  - r @91      | 36,63,76
  - w @97      | ########## | 113,123     | 36,63,76       | 119,129
  - r @113     | 97
  - w @119     | ########## | 123         | 97             | 129
  - r @123     | 97,119
  - w @129     | ########## | 133         | 97,119         | 144
  - r @133     | 129
  - r @138     | 4
  - w @144     | ########## | not read    | 4,129          | none

$implicitThrow:
  - w @38          | ########## | 99          | none           | 83
  - w @83          | ########## | 99          | 38             | none
  - r @99          | 38,83

$finalStep:
  - w @41          | ########## | 105         | none           | 67
  - w @67          | ########## | 105         | 41             | none
  - r @105         | 41,67

$finalCatchArg:
  - w @44          | ########## | 102         | none           | 87
  - w @87          | ########## | 102         | 44             | none
  - r @102         | 44,87
