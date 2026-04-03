# Preval test case

# try_entry8.md

> Ref tracking > Done > Try-random > Try entry8
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
    } finally {
      $(x);
      x = 2; // Does overwrite itself
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
  /*12~53*/ /* stmt(15): */ let /*___16__*/ $implicitThrow = false;
  /* stmt(18): */ let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /* stmt(21): */ try /*22~26*/ {
    /* stmt(23): */ $(/*___26__*/ x);
  } catch (/*___28__*/ $finalImplicit) /*29~39*/ {
    /* stmt(30): */ $(/*___33__*/ x);
    /* stmt(34): */ /*___37__*/ x = 2;
    /* stmt(38): */ throw /*___39__*/ $finalImplicit;
  }
  /* stmt(40): */ $(/*___43__*/ x);
  /* stmt(44): */ /*___47__*/ x = 2;
  /* stmt(48): */ if (/*___49__*/ $implicitThrow) {
    /*50~52*/ /* stmt(51): */ throw /*___52__*/ $finalCatchArg;
  } /*53~53*/ else {
  }
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,33,43  | none           | 37,47
  - r @9       | 4
  - r @26      | 4,47
  - r @33      | 4,47
  - w @37      | ########## | not read    | 4,47           | none
  - r @43      | 4,47
  - w @47      | ########## | 26,33,43    | 4,47           | 37,47

$implicitThrow:
  - w @16          | ########## | 49          | none           | none
  - r @49          | 16

$finalCatchArg:
  - w @19          | ########## | 52          | none           | none
  - r @52          | 19

$finalImplicit:
  - w @28          | ########## | 39          | none           | none
  - r @39          | 28
