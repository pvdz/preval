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
  /*10*/ $(x___14__);
  x___20__ = $(2);
  here___22__: /*23*/ {
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
      if ($finalStep___95__) {
        /*96*/ break here___98__;
      } /*99*/ else {
        $(x___103__);
        x___109__ = $(6);
      }
    }
  }
  $(x___113__);
  x___119__ = $(7);
} /*120*/ else {
}
$(x___124__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,14,124    | none           | 20
  - r @9       | 4
  - r @14      | 4
  - w @20      | ########## | 27,113      | 4              | 33,119
  - r @27      | 20
  - w @33      | ########## | 54,81       | 20             | 60,87
  - r @54      | 33
  - w @60      | ########## | 81          | 33             | 87
  - r @81      | 33,60
  - w @87      | ########## | 103,113     | 33,60          | 109,119
  - r @103     | 87
  - w @109     | ########## | 113         | 87             | 119
  - r @113     | 20,87,109
  - w @119     | ########## | 124         | 20,87,109      | none
  - r @124     | 4,119

$implicitThrow:
  - w @36          | ########## | 89          | none           | 73
  - w @73          | ########## | 89          | 36             | none
  - r @89          | 36,73

$finalStep:
  - w @40          | ########## | 95          | none           | 64
  - w @64          | ########## | 95          | 40             | none
  - r @95          | 40,64

$finalCatchArg:
  - w @44          | ########## | 92          | none           | 77
  - w @77          | ########## | 92          | 44             | none
  - r @92          | 44,77
