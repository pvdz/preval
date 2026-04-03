# Preval test case

# try_entry6.md

> Ref tracking > Done > Try-random > Try entry6
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
      $(x);
      x = 2; // Does overwrite itself
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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ $(/*___9__*/ x);
/* stmt(10): */ while (true) {
  /*12~49*/ /* stmt(15): */ let /*___16__*/ $implicitThrow = false;
  /* stmt(18): */ let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /* stmt(21): */ try /*22~30*/ {
    /* stmt(23): */ $(/*___26__*/ x);
    /* stmt(27): */ /*___30__*/ x = 2;
  } catch (/*___32__*/ $finalImplicit) /*33~39*/ {
    /* stmt(34): */ $(/*___37__*/ x);
    /* stmt(38): */ throw /*___39__*/ $finalImplicit;
  }
  /* stmt(40): */ $(/*___43__*/ x);
  /* stmt(44): */ if (/*___45__*/ $implicitThrow) {
    /*46~48*/ /* stmt(47): */ throw /*___48__*/ $finalCatchArg;
  } /*49~49*/ else {
  }
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,37     | none           | 30
  - r @9       | 4
  - r @26      | 4,30
  - w @30      | ########## | 26,37,43    | 4,30           | 30
  - r @37      | 4,30
  - r @43      | 30

$implicitThrow:
  - w @16          | ########## | 45          | none           | none
  - r @45          | 16

$finalCatchArg:
  - w @19          | ########## | 48          | none           | none
  - r @48          | 19

$finalImplicit:
  - w @32          | ########## | 39          | none           | none
  - r @39          | 32
