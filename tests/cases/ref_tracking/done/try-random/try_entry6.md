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
    $(x___37__);
    throw $finalImplicit___39__;
  }
  $(x___43__);
  if ($implicitThrow___45__) {
    /*46*/ throw $finalCatchArg___48__;
  } /*49*/ else {
  }
}
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,37     | none           | 30
  - r @9       | 4
  - r @26      | 4,30
  - w @30      | ########## | 26,37,43    | 4,30           | 30
  - r @37      | 4,30
  - r @43      | 30

$implicitThrow:
  - w @15          | ########## | 45          | none           | none
  - r @45          | 15

$finalCatchArg:
  - w @19          | ########## | 48          | none           | none
  - r @48          | 19
