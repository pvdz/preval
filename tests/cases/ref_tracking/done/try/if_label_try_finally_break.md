# Preval test case

# if_label_try_finally_break.md

> Ref tracking > Done > Try > If label try finally break
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
        x___60__ = $(4);
        $finalStep___64__ = true;
        break $finally___66__;
      } catch ($finalImplicit___68__) /*69*/ {
        $implicitThrow___73__ = true;
        $finalCatchArg___77__ = $finalImplicit___76__;
      }
    }
    $(x___81__);
    x___87__ = $(5);
    if ($implicitThrow___89__) {
      /*90*/ throw $finalCatchArg___92__;
    } /*93*/ else {
      break here___95__;
    }
  }
  $(x___99__);
  x___105__ = $(7);
  $(x___109__);
} /*110*/ else {
  $(x___114__);
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
