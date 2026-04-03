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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~42*/ /* stmt(15): */ /*___18__*/ x = 2;
  /* stmt(19): */ let /*___20__*/ $implicitThrow = false;
  /* stmt(22): */ let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  /* stmt(25): */ if ($) {
    /*27~35*/ /* stmt(28): */ $(/*___31__*/ x);
    /* stmt(32): */ /*___35__*/ x = 3;
  } /*36~36*/ else {
  }
  /* stmt(37): */ if (/*___38__*/ $implicitThrow) {
    /*39~41*/ /* stmt(40): */ throw /*___41__*/ $finalCatchArg;
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
