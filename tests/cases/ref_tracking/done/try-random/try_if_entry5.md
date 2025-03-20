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
  if ($) {
    /*27*/ $(x___31__);
    x___35__ = 3;
  } /*36*/ else {
  }
  if ($implicitThrow___38__) {
    /*39*/ throw $finalCatchArg___41__;
  } /*42*/ else {
  }
}
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9           | none           | 16
  - r @9       | 4
  - w @16      | ########## | 31          | 4,16,35        | 16,35
  - r @31      | 16
  - w @35      | ########## | not read    | 16             | 16

$implicitThrow:
  - w @19          | ########## | 38          | none           | none
  - r @38          | 19

$finalCatchArg:
  - w @23          | ########## | 41          | none           | none
  - r @41          | 23
