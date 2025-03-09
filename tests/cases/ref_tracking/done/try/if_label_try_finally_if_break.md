# Preval test case

# if_label_try_finally_if_break.md

> Ref tracking > Done > Try > If label try finally if break
>
> The break goes through a finally so the last write

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  if (x) {               // x=1
    $(x);                // x=1
    x = $(2);
    here: {
      $(x);              // x=2
      x = $(3);
      try {
        $(x);            // x=3
        if (x) {         // x=3
          x = $(4);
          break here;
        }
        x = $(5);        // preval won't know x=3 so must consider this reachable
      } finally {
        $(x);            // x=3 4 5
        x = $(6);
      }
      $(x);              // x=6 (must be considered reachable)
      x = $(7);
    }
    $(x);                // x=6 7
    x = $(8);
  }
  $(x);                  // x=1 8
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = $(1);
if (x___9__) {
  /*10*/ here___12__: /*13*/ {
    $(x___17__);
    x___23__ = $(2);
    $(x___27__);
    x___33__ = $(3);
    let $implicitThrow___36__ = false;
    let $finalStep___40__ = false;
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
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,17,138    | none           | 23
  - r @9       | 4
  - r @17      | 4
  - w @23      | ########## | 27          | 4              | 33
  - r @27      | 23
  - w @33      | ########## | 54,56,91    | 23             | 63,76,97
  - r @54      | 33
  - r @56      | 33
  - w @63      | ########## | 91          | 33             | 97
  - w @76      | ########## | 91          | 33             | 97
  - r @91      | 33,63,76
  - w @97      | ########## | 113,123     | 33,63,76       | 119,129
  - r @113     | 97
  - w @119     | ########## | 123         | 97             | 129
  - r @123     | 97,119
  - w @129     | ########## | 133         | 97,119         | none
  - r @133     | 129
  - r @138     | 4

$implicitThrow:
  - w @36          | ########## | 99          | none           | 83
  - w @83          | ########## | 99          | 36             | none
  - r @99          | 36,83

$finalStep:
  - w @40          | ########## | 105         | none           | 67
  - w @67          | ########## | 105         | 40             | none
  - r @105         | 40,67

$finalCatchArg:
  - w @44          | ########## | 102         | none           | 87
  - w @87          | ########## | 102         | 44             | none
  - r @102         | 44,87
