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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~53*/ /*___18__*/ x = 2;
  let /*___20__*/ $implicitThrow = false;
  let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  try /*26~34*/ {
    $(/*___30__*/ x);
    /*___34__*/ x = 3;
  } catch (/*___36__*/ $finalImplicit) /*37~43*/ {
    $(/*___41__*/ x);
    throw /*___43__*/ $finalImplicit;
  }
  $(/*___47__*/ x);
  if (/*___49__*/ $implicitThrow) {
    /*50~52*/ throw /*___52__*/ $finalCatchArg;
  } /*53~53*/ else {
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
  - w @18      | ########## | 30,41       | 4,34           | 34
  - r @30      | 18
  - w @34      | ########## | 41,47       | 18             | 18
  - r @41      | 18,34
  - r @47      | 34

$implicitThrow:
  - w @20          | ########## | 49          | none           | none
  - r @49          | 20

$finalCatchArg:
  - w @23          | ########## | 52          | none           | none
  - r @52          | 23

$finalImplicit:
  - w @36          | ########## | 43          | none           | none
  - r @43          | 36
