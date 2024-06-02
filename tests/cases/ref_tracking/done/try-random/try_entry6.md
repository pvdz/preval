# Preval test case

# try_entry6.md

> Ref tracking > Done > Try-random > Try entry6
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  while (true) {
    try {
      $(x);
      x = 2; // Does overwrite itself
    } finally {
      $(x);
    }
  }
  $(x); // unreachable
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ let $implicitThrow___15__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  try /*22*/ {
    $(x___26__);
    x___30__ = 2;
  } catch ($finalImplicit___32__) /*33*/ {
    $implicitThrow___37__ = true;
    $finalCatchArg___41__ = $finalImplicit___40__;
  }
  $(x___45__);
  if ($implicitThrow___47__) {
    /*48*/ throw $finalCatchArg___50__;
  } /*51*/ else {
  }
}
$(x___55__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,45     | none           | 30
  - r @9       | 4
  - r @26      | 4,30
  - w @30      | ########## | 26,45       | 4,30           | 30
  - r @45      | 4,30
  - r @55      | none (unreachable?)

$implicitThrow:
  - w @15          | ########## | 47          | none           | 37
  - w @37          | ########## | 47          | 15             | none
  - r @47          | 15,37

$finalCatchArg:
  - w @19          | ########## | 50          | none           | 41
  - w @41          | ########## | 50          | 19             | none
  - r @50          | 19,41
