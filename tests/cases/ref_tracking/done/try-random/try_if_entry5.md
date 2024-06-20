# Preval test case

# try_if_entry5.md

> Ref tracking > Done > Try-random > Try if entry5
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
      if ($) {
        $(x);
        x = 3; // Does not overwrite itself
      }
    } finally {
      
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
    if ($) {
      /*29*/ $(x___33__);
      x___37__ = 3;
    } /*38*/ else {
    }
  } catch ($finalImplicit___40__) /*41*/ {
    $implicitThrow___45__ = true;
    $finalCatchArg___49__ = $finalImplicit___48__;
  }
  if ($implicitThrow___51__) {
    /*52*/ throw $finalCatchArg___54__;
  } /*55*/ else {
  }
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 33          | 4,16,37        | 16,37
  - r @33      | 16
  - w @37      | ########## | not read    | 16             | 16

$implicitThrow:
  - w @19          | ########## | 51          | none           | 45
  - w @45          | ########## | 51          | 19             | none
  - r @51          | 19,45

$finalCatchArg:
  - w @23          | ########## | 54          | none           | 49
  - w @49          | ########## | 54          | 23             | none
  - r @54          | 23,49
