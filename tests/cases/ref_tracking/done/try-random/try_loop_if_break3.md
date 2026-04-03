# Preval test case

# try_loop_if_break3.md

> Ref tracking > Done > Try-random > Try loop if break3
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) {
    try {
      $(x);   // x=1
    } finally {
      $(x);   // x=1
      if ($1) {
        x = 2;  // Does not overwrite itself because it does not loop
        break;
      }
      $(x);   // x=1
      break;
    }
  }
  $(x);       // x=1 2
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
  /* stmt(38): */ $(/*___41__*/ x);
  /* stmt(42): */ if ($1) {
    /*44~49*/ /* stmt(45): */ /*___48__*/ x = 2;
    /* stmt(49): */ break;
  } /*50~55*/ else {
    /* stmt(51): */ $(/*___54__*/ x);
    /* stmt(55): */ break;
  }
}
/* stmt(56): */ $(/*___59__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,41,54,59 | none           | 48
  - r @9       | 4
  - r @26      | 4
  - r @41      | 4
  - w @48      | ########## | 59          | 4              | none
  - r @54      | 4
  - r @59      | 4,48

$implicitThrow:
  - w @16          | ########## | not read    | none           | 33
  - w @33          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @19          | ########## | not read    | none           | 37
  - w @37          | ########## | not read    | 19             | none

$finalImplicit:
  - w @28          | ########## | 36          | none           | none
  - r @36          | 28
