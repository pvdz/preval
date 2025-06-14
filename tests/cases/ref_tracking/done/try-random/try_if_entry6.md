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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~38*/ let /*___16__*/ $implicitThrow = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  if ($) {
    /*23~31*/ $(/*___27__*/ x);
    /*___31__*/ x = 2;
  } /*32~32*/ else {
  }
  if (/*___34__*/ $implicitThrow) {
    /*35~37*/ throw /*___37__*/ $finalCatchArg;
  } /*38~38*/ else {
  }
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,27        | none           | 31
  - r @9       | 4
  - r @27      | 4,31
  - w @31      | ########## | 27          | 4,31           | 31

$implicitThrow:
  - w @16          | ########## | 34          | none           | none
  - r @34          | 16

$finalCatchArg:
  - w @19          | ########## | 37          | none           | none
  - r @37          | 19
