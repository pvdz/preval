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
    $(x___41__);
    throw $finalImplicit___43__;
  }
  $(x___47__);
  if ($implicitThrow___49__) {
    /*50*/ throw $finalCatchArg___52__;
  } /*53*/ else {
  }
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 30,41       | 4,34           | 34
  - r @30      | 16
  - w @34      | ########## | 41,47       | 16             | 16
  - r @41      | 16,34
  - r @47      | 34

$implicitThrow:
  - w @19          | ########## | 49          | none           | none
  - r @49          | 19

$finalCatchArg:
  - w @23          | ########## | 52          | none           | none
  - r @52          | 23
