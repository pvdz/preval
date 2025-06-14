# Preval test case

# try_loop_if_break1.md

> Ref tracking > Done > Try-random > Try loop if break1
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
    }
  }
  $(x);       // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~56*/ let /*___16__*/ $implicitThrow = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  try /*22~26*/ {
    $(/*___26__*/ x);
  } catch (/*___28__*/ $finalImplicit) /*29~37*/ {
    /*___33__*/ $implicitThrow = true;
    /*___37__*/ $finalCatchArg = /*___36__*/ $finalImplicit;
  }
  $(/*___41__*/ x);
  if ($1) {
    /*44~49*/ /*___48__*/ x = 2;
    break;
  } /*50~56*/ else {
    if (/*___52__*/ $implicitThrow) {
      /*53~55*/ throw /*___55__*/ $finalCatchArg;
    } /*56~56*/ else {
    }
  }
}
$(/*___60__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,41     | none           | 48
  - r @9       | 4
  - r @26      | 4
  - r @41      | 4
  - w @48      | ########## | 60          | 4              | none
  - r @60      | 48

$implicitThrow:
  - w @16          | ########## | 52          | none           | 33
  - w @33          | ########## | 52          | 16             | none
  - r @52          | 16,33

$finalCatchArg:
  - w @19          | ########## | 55          | none           | 37
  - w @37          | ########## | 55          | 19             | none
  - r @55          | 19,37

$finalImplicit:
  - w @28          | ########## | 36          | none           | none
  - r @36          | 28
