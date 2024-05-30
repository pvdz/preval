# Preval test case

# try_entry5.md

> Ref tracking > Done > Try-random > Try entry5
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
      x = 3; // Does not overwrite itself
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
  /*12*/ x___16__ = 2;
  let $implicitThrow___19__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  try /*26*/ {
    $(x___30__);
    x___34__ = 3;
  } catch ($finalImplicit___36__) /*37*/ {
    $implicitThrow___41__ = true;
    $finalCatchArg___45__ = $finalImplicit___44__;
  }
  $(x___49__);
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
  - w @4       | ########## | 9,59        | none           | 16
  - r @9       | 4
  - w @16      | ########## | 30,49       | 4,16,34        | 16,34
  - r @30      | 16
  - w @34      | ########## | 49          | 16             | 16
  - r @49      | 16,34
  - r @59      | 4

$implicitThrow:
  - w @19          | ########## | 51          | none           | 41
  - w @41          | ########## | 51          | 19             | none
  - r @51          | 19,41

$finalCatchArg:
  - w @23          | ########## | 54          | none           | 45
  - w @45          | ########## | 54          | 23             | none
  - r @54          | 23,45
