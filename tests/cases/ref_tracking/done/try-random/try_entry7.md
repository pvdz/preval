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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~57*/ /*___18__*/ x = 2;
  let /*___20__*/ $implicitThrow = false;
  let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  try /*26~30*/ {
    $(/*___30__*/ x);
  } catch (/*___32__*/ $finalImplicit) /*33~43*/ {
    $(/*___37__*/ x);
    /*___41__*/ x = 3;
    throw /*___43__*/ $finalImplicit;
  }
  $(/*___47__*/ x);
  /*___51__*/ x = 3;
  if (/*___53__*/ $implicitThrow) {
    /*54~56*/ throw /*___56__*/ $finalCatchArg;
  } /*57~57*/ else {
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
  - w @18      | ########## | 30,37,47    | 4,51           | 41,51
  - r @30      | 18
  - r @37      | 18
  - w @41      | ########## | not read    | 18             | none
  - r @47      | 18
  - w @51      | ########## | not read    | 18             | 18

$implicitThrow:
  - w @20          | ########## | 53          | none           | none
  - r @53          | 20

$finalCatchArg:
  - w @23          | ########## | 56          | none           | none
  - r @56          | 23

$finalImplicit:
  - w @32          | ########## | 43          | none           | none
  - r @43          | 32
