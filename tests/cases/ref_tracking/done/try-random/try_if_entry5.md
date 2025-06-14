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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~42*/ /*___18__*/ x = 2;
  let /*___20__*/ $implicitThrow = false;
  let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  if ($) {
    /*27~35*/ $(/*___31__*/ x);
    /*___35__*/ x = 3;
  } /*36~36*/ else {
  }
  if (/*___38__*/ $implicitThrow) {
    /*39~41*/ throw /*___41__*/ $finalCatchArg;
  } /*42~42*/ else {
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
  - w @18      | ########## | 31          | 4,18,35        | 18,35
  - r @31      | 18
  - w @35      | ########## | not read    | 18             | 18

$implicitThrow:
  - w @20          | ########## | 38          | none           | none
  - r @38          | 20

$finalCatchArg:
  - w @23          | ########## | 41          | none           | none
  - r @41          | 23
