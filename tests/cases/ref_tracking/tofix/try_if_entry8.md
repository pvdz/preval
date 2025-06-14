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
let /*___4__*/ x = 1;
$(/*___9__*/ x);
while (true) {
  /*12~55*/ let /*___16__*/ $implicitThrow = false;
  let /*___19__*/ $finalCatchArg = /*___20__*/ undefined;
  try /*22~26*/ {
    $(/*___26__*/ x);
  } catch (/*___28__*/ $finalImplicit) /*29~37*/ {
    /*___33__*/ $implicitThrow = true;
    /*___37__*/ $finalCatchArg = /*___36__*/ $finalImplicit;
  }
  if ($) {
    /*40~48*/ $(/*___44__*/ x);
    /*___48__*/ x = 2;
  } /*49~49*/ else {
  }
  if (/*___51__*/ $implicitThrow) {
    /*52~54*/ throw /*___54__*/ $finalCatchArg;
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
