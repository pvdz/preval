# Preval test case

# try_if_entry7.md

> Ref tracking > Done > Try-random > Try if entry7
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
    x = 2;
    try {
      $(x);
    } finally {
      if ($) {
        $(x);
        x = 3; // Does not overwrite itself
      }
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
  /*12*/ x___18__ = 2;
  let $implicitThrow___20__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  try /*26*/ {
    $(x___30__);
  } catch ($finalImplicit___32__) /*33*/ {
    $implicitThrow___37__ = true;
    $finalCatchArg___41__ = $finalImplicit___40__;
  }
  if ($) {
    /*44*/ $(x___48__);
    x___52__ = 3;
  } /*53*/ else {
  }
  if ($implicitThrow___55__) {
    /*56*/ throw $finalCatchArg___58__;
  } /*59*/ else {
  }
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 18
  - r @9       | 4
  - w @18      | ########## | 30,48       | 4,18,52        | 18,52
  - r @30      | 18
  - r @48      | 18
  - w @52      | ########## | not read    | 18             | 18

$implicitThrow:
  - w @20          | ########## | 55          | none           | 37
  - w @37          | ########## | 55          | 20             | none
  - r @55          | 20,37

$finalCatchArg:
  - w @23          | ########## | 58          | none           | 41
  - w @41          | ########## | 58          | 23             | none
  - r @58          | 23,41

$finalImplicit:
  - w @32          | ########## | 40          | none           | none
  - r @40          | 32
