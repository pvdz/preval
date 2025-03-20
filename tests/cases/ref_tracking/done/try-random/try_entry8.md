# Preval test case

# try_entry8.md

> Ref tracking > Done > Try-random > Try entry8
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
    } finally {
      $(x);
      x = 2; // Does overwrite itself
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
  } catch ($finalImplicit___28__) /*29*/ {
    $(x___33__);
    x___37__ = 2;
    throw $finalImplicit___39__;
  }
  $(x___43__);
  x___47__ = 2;
  if ($implicitThrow___49__) {
    /*50*/ throw $finalCatchArg___52__;
  } /*53*/ else {
  }
}
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,33,43  | none           | 37,47
  - r @9       | 4
  - r @26      | 4,47
  - r @33      | 4,47
  - w @37      | ########## | not read    | 4,47           | none
  - r @43      | 4,47
  - w @47      | ########## | 26,33,43    | 4,47           | 37,47

$implicitThrow:
  - w @15          | ########## | 49          | none           | none
  - r @49          | 15

$finalCatchArg:
  - w @19          | ########## | 52          | none           | none
  - r @52          | 19
