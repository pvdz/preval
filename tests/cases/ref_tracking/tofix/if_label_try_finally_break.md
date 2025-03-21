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
  - w @4       | ########## | 9,17,114    | none           | 23
  - r @9       | 4
  - r @17      | 4
  - w @23      | ########## | 27          | 4              | 33
  - r @27      | 23
  - w @33      | ########## | 54,81       | 23             | 60,87
  - r @54      | 33
  - w @60      | ########## | 81          | 33             | 87
  - r @81      | 33,60
  - w @87      | ########## | 99          | 33,60          | 105
  - r @99      | 87
  - w @105     | ########## | 109         | 87             | none
  - r @109     | 105
  - r @114     | 4

$implicitThrow:
  - w @36          | ########## | 89          | none           | 73
  - w @73          | ########## | 89          | 36             | none
  - r @89          | 36,73

$finalStep:
  - w @40          | ########## | not read    | none           | 64
  - w @64          | ########## | not read    | 40             | none

$finalCatchArg:
  - w @44          | ########## | 92          | none           | 77
  - w @77          | ########## | 92          | 44             | none
  - r @92          | 44,77
