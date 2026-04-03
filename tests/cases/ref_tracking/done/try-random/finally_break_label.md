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
/* stmt(3): */ let /*___4__*/ x = $(1);
/* stmt(8): */ if (/*___9__*/ x) {
  /*10~133*/ /* stmt(11): */ /*___12__*/ here: /*13~119*/ {
    /* stmt(17): */ $(/*___20__*/ x);
    /* stmt(21): */ /*___26__*/ x = $(2);
    /* stmt(27): */ $(/*___30__*/ x);
    /* stmt(31): */ /*___36__*/ x = $(3);
    /* stmt(37): */ let /*___38__*/ $implicitThrow = false;
    /* stmt(40): */ let /*___41__*/ $finalStep = false;
    /* stmt(43): */ let /*___44__*/ $finalCatchArg = /*___45__*/ undefined;
    /* stmt(46): */ /*___47__*/ $finally: /*48~87*/ {
      /* stmt(49): */ try /*50~76*/ {
        /* stmt(51): */ $(/*___54__*/ x);
        /* stmt(55): */ if (/*___56__*/ x) {
          /*57~69*/ /* stmt(58): */ /*___63__*/ x = $(4);
          /* stmt(64): */ /*___67__*/ $finalStep = true;
          /* stmt(68): */ break /*___69__*/ $finally;
        } /*70~76*/ else {
          /* stmt(71): */ /*___76__*/ x = $(5);
        }
      } catch (/*___78__*/ $finalImplicit) /*79~87*/ {
        /* stmt(80): */ /*___83__*/ $implicitThrow = true;
        /* stmt(84): */ /*___87__*/ $finalCatchArg = /*___86__*/ $finalImplicit;
      }
    }
    /* stmt(88): */ $(/*___91__*/ x);
    /* stmt(92): */ /*___97__*/ x = $(6);
    /* stmt(98): */ if (/*___99__*/ $implicitThrow) {
      /*100~102*/ /* stmt(101): */ throw /*___102__*/ $finalCatchArg;
    } /*103~119*/ else {
      /* stmt(104): */ if (/*___105__*/ $finalStep) {
        /*106~108*/ /* stmt(107): */ break /*___108__*/ here;
      } /*109~119*/ else {
        /* stmt(110): */ $(/*___113__*/ x);
        /* stmt(114): */ /*___119__*/ x = $(7);
      }
    }
  }
  /* stmt(120): */ $(/*___123__*/ x);
  /* stmt(124): */ /*___129__*/ x = $(8);
  /* stmt(130): */ $(/*___133__*/ x);
} /*134~138*/ else {
  /* stmt(135): */ $(/*___138__*/ x);
}
/* stmt(139): */ /*___144__*/ x = $(9);
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

$finalImplicit:
  - w @78          | ########## | 86          | none           | none
  - r @86          | 78
