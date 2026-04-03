# Preval test case

# try_if_entry8.md

> Ref tracking > Tofix > Try if entry8
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
      if ($) {
        $(x);
        x = 2; // Does overwrite itself
      }
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
  /*12~55*/ /* stmt(15): */ let /*___16__*/ $implicitThrow = false;
  /* stmt(18): */ let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  /* stmt(21): */ try /*22~26*/ {
    /* stmt(23): */ $(/*___26__*/ x);
  } catch (/*___28__*/ $finalImplicit) /*29~37*/ {
    /* stmt(30): */ /*___33__*/ $implicitThrow = true;
    /* stmt(34): */ /*___37__*/ $finalCatchArg = /*___36__*/ $finalImplicit;
  }
  /* stmt(38): */ if ($) {
    /*40~48*/ /* stmt(41): */ $(/*___44__*/ x);
    /* stmt(45): */ /*___48__*/ x = 2;
  } /*49~49*/ else {
  }
  /* stmt(50): */ if (/*___51__*/ $implicitThrow) {
    /*52~54*/ /* stmt(53): */ throw /*___54__*/ $finalCatchArg;
  } /*55~55*/ else {
  }
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,44     | none           | 48
  - r @9       | 4
  - r @26      | 4,48
  - r @44      | 4,48
  - w @48      | ########## | 26,44       | 4,48           | 48

$implicitThrow:
  - w @16          | ########## | 51          | none           | 33
  - w @33          | ########## | 51          | 16             | none
  - r @51          | 16,33

$finalCatchArg:
  - w @19          | ########## | 54          | none           | 37
  - w @37          | ########## | 54          | 19             | none
  - r @54          | 19,37

$finalImplicit:
  - w @28          | ########## | 36          | none           | none
  - r @36          | 28
