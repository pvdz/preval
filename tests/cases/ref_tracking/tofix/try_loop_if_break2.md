# Preval test case

# try_loop_if_break2.md

> Ref tracking > Tofix > Try loop if break2
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
      $(x);   // x=1 2
    } finally {
      $(x);   // x=1 2
      x = 2;  // Can overwrite itself
      if ($1) {
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
  /*___45__*/ x = 2;
  if ($1) {
    /*48~49*/ break;
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
  - w @4       | ########## | 9,26,41     | none           | 45
  - r @9       | 4
  - r @26      | 4,45
  - r @41      | 4,45
  - w @45      | ########## | 26,41,60    | 4,45           | 45
  - r @60      | 45

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
