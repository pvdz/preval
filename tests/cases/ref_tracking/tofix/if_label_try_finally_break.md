# Preval test case

# if_label_try_finally_break.md

> Ref tracking > Tofix > If label try finally break
>
> The break goes through a finally

## Options

- refTest

## Input

`````js filename=intro
{
  let x = $(1);
  if (x) {                 // x=1
    $(x);                  // x=1
    x = $(2);
    here: {
      $(x);                // x=2
      x = $(3);
      try {
        $(x);              // x=3
        x = $(4);
        break here;
      } finally {
        $(x);              // x=3 or 4
        x = $(5);          // visited (!)
      }
      $(x);                // unreachable
      x = $(6);            // not visited, so not observed (else, 5?)
    }
    $(x);                  // x=5 (always)
    x = $(7);              // visited
  }
  $(x);                    // x=1 or x=7
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = $(1);
if (/*___9__*/ x) {
  /*10~109*/ /*___12__*/ here: /*13~95*/ {
    $(/*___20__*/ x);
    /*___26__*/ x = $(2);
    $(/*___30__*/ x);
    /*___36__*/ x = $(3);
    let /*___38__*/ $implicitThrow = false;
    let /*___41__*/ $finalStep = false;
    let /*___44__*/ $finalCatchArg = /*___45__*/ undefined;
    /*___47__*/ $finally: /*48~77*/ {
      try /*50~66*/ {
        $(/*___54__*/ x);
        /*___60__*/ x = $(4);
        /*___64__*/ $finalStep = true;
        break /*___66__*/ $finally;
      } catch (/*___68__*/ $finalImplicit) /*69~77*/ {
        /*___73__*/ $implicitThrow = true;
        /*___77__*/ $finalCatchArg = /*___76__*/ $finalImplicit;
      }
    }
    $(/*___81__*/ x);
    /*___87__*/ x = $(5);
    if (/*___89__*/ $implicitThrow) {
      /*90~92*/ throw /*___92__*/ $finalCatchArg;
    } /*93~95*/ else {
      break /*___95__*/ here;
    }
  }
  $(/*___99__*/ x);
  /*___105__*/ x = $(7);
  $(/*___109__*/ x);
} /*110~114*/ else {
  $(/*___114__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,20,114    | none           | 26
  - r @9       | 4
  - r @20      | 4
  - w @26      | ########## | 30          | 4              | 36
  - r @30      | 26
  - w @36      | ########## | 54,81       | 26             | 60,87
  - r @54      | 36
  - w @60      | ########## | 81          | 36             | 87
  - r @81      | 36,60
  - w @87      | ########## | 99          | 36,60          | 105
  - r @99      | 87
  - w @105     | ########## | 109         | 87             | none
  - r @109     | 105
  - r @114     | 4

$implicitThrow:
  - w @38          | ########## | 89          | none           | 73
  - w @73          | ########## | 89          | 38             | none
  - r @89          | 38,73

$finalStep:
  - w @41          | ########## | not read    | none           | 64
  - w @64          | ########## | not read    | 41             | none

$finalCatchArg:
  - w @44          | ########## | 92          | none           | 77
  - w @77          | ########## | 92          | 44             | none
  - r @92          | 44,77

$finalImplicit:
  - w @68          | ########## | 76          | none           | none
  - r @76          | 68
