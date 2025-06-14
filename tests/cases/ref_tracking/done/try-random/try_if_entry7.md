# Preval test case

# try_if_entry7.md

> Ref tracking > Done > Try-random > Try if entry7
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
      if ($) {
        $(x);
        x = 3; // Does not overwrite itself
      }
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
  /*12~59*/ /*___18__*/ x = 2;
  let /*___20__*/ $implicitThrow = false;
  let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  try /*26~30*/ {
    $(/*___30__*/ x);
  } catch (/*___32__*/ $finalImplicit) /*33~41*/ {
    /*___37__*/ $implicitThrow = true;
    /*___41__*/ $finalCatchArg = /*___40__*/ $finalImplicit;
  }
  if ($) {
    /*44~52*/ $(/*___48__*/ x);
    /*___52__*/ x = 3;
  } /*53~53*/ else {
  }
  if (/*___55__*/ $implicitThrow) {
    /*56~58*/ throw /*___58__*/ $finalCatchArg;
  } /*59~59*/ else {
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
  - w @18      | ########## | 30,48       | 4,18,52        | 18,52
  - r @30      | 18
  - r @48      | 18
  - w @52      | ########## | not read    | 18             | 18

$implicitThrow:
  - w @20          | ########## | 55          | none           | 37
  - w @37          | ########## | 55          | 20             | none
  - r @55          | 20,37

$finalCatchArg:
  - w @23          | ########## | 58          | none           | 41
  - w @41          | ########## | 58          | 23             | none
  - r @58          | 23,41

$finalImplicit:
  - w @32          | ########## | 40          | none           | none
  - r @40          | 32
