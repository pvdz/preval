# Preval test case

# try_entry7.md

> Ref tracking > Done > Try-random > Try entry7
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
      $(x);
      x = 3; // Does not overwrite itself
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
  /*12*/ x___16__ = 2;
  let $implicitThrow___19__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  try /*26*/ {
    $(x___30__);
  } catch ($finalImplicit___32__) /*33*/ {
    $(x___37__);
    x___41__ = 3;
    throw $finalImplicit___43__;
  }
  $(x___47__);
  x___51__ = 3;
  if ($implicitThrow___53__) {
    /*54*/ throw $finalCatchArg___56__;
  } /*57*/ else {
  }
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 30,37,47    | 4,51           | 41,51
  - r @30      | 16
  - r @37      | 16
  - w @41      | ########## | not read    | 16             | none
  - r @47      | 16
  - w @51      | ########## | not read    | 16             | 16

$implicitThrow:
  - w @19          | ########## | 53          | none           | none
  - r @53          | 19

$finalCatchArg:
  - w @23          | ########## | 56          | none           | none
  - r @56          | 23
