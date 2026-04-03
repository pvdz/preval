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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~38*/ /* stmt(15): */ let /*___16__*/ $implicitThrow = false;
  /* stmt(18): */ let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /* stmt(21): */ if ($) {
    /*23~31*/ /* stmt(24): */ $(/*___27__*/ x);
    /* stmt(28): */ /*___31__*/ x = 2;
  } /*32~32*/ else {
  }
  /* stmt(33): */ if (/*___34__*/ $implicitThrow) {
    /*35~37*/ /* stmt(36): */ throw /*___37__*/ $finalCatchArg;
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
