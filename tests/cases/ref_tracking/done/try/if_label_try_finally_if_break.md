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
let /*___4__*/ x = $(1);
if (/*___9__*/ x) {
  /*10~133*/ /*___12__*/ here: /*13~119*/ {
    $(/*___20__*/ x);
    /*___26__*/ x = $(2);
    $(/*___30__*/ x);
    /*___36__*/ x = $(3);
    let /*___38__*/ $implicitThrow = false;
    let /*___41__*/ $finalStep = false;
    let /*___44__*/ $finalCatchArg = /*___45__*/ undefined;
    /*___47__*/ $finally: /*48~87*/ {
      try /*50~76*/ {
        $(/*___54__*/ x);
        if (/*___56__*/ x) {
          /*57~69*/ /*___63__*/ x = $(4);
          /*___67__*/ $finalStep = true;
          break /*___69__*/ $finally;
        } /*70~76*/ else {
          /*___76__*/ x = $(5);
        }
      } catch (/*___78__*/ $finalImplicit) /*79~87*/ {
        /*___83__*/ $implicitThrow = true;
        /*___87__*/ $finalCatchArg = /*___86__*/ $finalImplicit;
      }
    }
    $(/*___91__*/ x);
    /*___97__*/ x = $(6);
    if (/*___99__*/ $implicitThrow) {
      /*100~102*/ throw /*___102__*/ $finalCatchArg;
    } /*103~119*/ else {
      if (/*___105__*/ $finalStep) {
        /*106~108*/ break /*___108__*/ here;
      } /*109~119*/ else {
        $(/*___113__*/ x);
        /*___119__*/ x = $(7);
      }
    }
  }
  $(/*___123__*/ x);
  /*___129__*/ x = $(8);
  $(/*___133__*/ x);
} /*134~138*/ else {
  $(/*___138__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,20,138    | none           | 26
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
  - w @129     | ########## | 133         | 97,119         | none
  - r @133     | 129
  - r @138     | 4

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

$finalImplicit:
  - w @78          | ########## | 86          | none           | none
  - r @86          | 78
