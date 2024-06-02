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
    $implicitThrow___37__ = true;
    $finalCatchArg___41__ = $finalImplicit___40__;
  }
  $(x___45__);
  x___49__ = 3;
  if ($implicitThrow___51__) {
    /*52*/ throw $finalCatchArg___54__;
  } /*55*/ else {
  }
}
$(x___59__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 30,45       | 4,49           | 49
  - r @30      | 16
  - r @45      | 16
  - w @49      | ########## | not read    | 16             | 16
  - r @59      | none (unreachable?)

$implicitThrow:
  - w @19          | ########## | 51          | none           | 37
  - w @37          | ########## | 51          | 19             | none
  - r @51          | 19,37

$finalCatchArg:
  - w @23          | ########## | 54          | none           | 41
  - w @41          | ########## | 54          | 23             | none
  - r @54          | 23,41
