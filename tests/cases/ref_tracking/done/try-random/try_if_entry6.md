# Preval test case

# try_if_entry6.md

> Ref tracking > Done > Try-random > Try if entry6
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
      if ($) {
        $(x);
        x = 2; // Does overwrite itself
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
  /*12*/ let $implicitThrow___15__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  if ($) {
    /*23*/ $(x___27__);
    x___31__ = 2;
  } /*32*/ else {
  }
  if ($implicitThrow___34__) {
    /*35*/ throw $finalCatchArg___37__;
  } /*38*/ else {
  }
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,27        | none           | 31
  - r @9       | 4
  - r @27      | 4,31
  - w @31      | ########## | 27          | 4,31           | 31

$implicitThrow:
  - w @15          | ########## | 34          | none           | none
  - r @34          | 15

$finalCatchArg:
  - w @19          | ########## | 37          | none           | none
  - r @37          | 19
