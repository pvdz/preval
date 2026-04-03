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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~57*/ /* stmt(15): */ /*___18__*/ x = 2;
  /* stmt(19): */ let /*___20__*/ $implicitThrow = false;
  /* stmt(22): */ let /*___23__*/ $finalCatchArg = /*___24__*/ undefined;
  /* stmt(25): */ try /*26~30*/ {
    /* stmt(27): */ $(/*___30__*/ x);
  } catch (/*___32__*/ $finalImplicit) /*33~43*/ {
    /* stmt(34): */ $(/*___37__*/ x);
    /* stmt(38): */ /*___41__*/ x = 3;
    /* stmt(42): */ throw /*___43__*/ $finalImplicit;
  }
  /* stmt(44): */ $(/*___47__*/ x);
  /* stmt(48): */ /*___51__*/ x = 3;
  /* stmt(52): */ if (/*___53__*/ $implicitThrow) {
    /*54~56*/ /* stmt(55): */ throw /*___56__*/ $finalCatchArg;
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
