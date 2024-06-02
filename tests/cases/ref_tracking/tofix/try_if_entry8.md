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
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ let $implicitThrow___15__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  try /*22*/ {
    $(x___26__);
  } catch ($finalImplicit___28__) /*29*/ {
    $implicitThrow___33__ = true;
    $finalCatchArg___37__ = $finalImplicit___36__;
  }
  if ($) {
    /*40*/ $(x___44__);
    x___48__ = 2;
  } /*49*/ else {
  }
  if ($implicitThrow___51__) {
    /*52*/ throw $finalCatchArg___54__;
  } /*55*/ else {
  }
}
$(x___59__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,44     | none           | 48
  - r @9       | 4
  - r @26      | 4,48
  - r @44      | 4,48
  - w @48      | ########## | 26,44       | 4,48           | 48
  - r @59      | none (unreachable?)

$implicitThrow:
  - w @15          | ########## | 51          | none           | 33
  - w @33          | ########## | 51          | 15             | none
  - r @51          | 15,33

$finalCatchArg:
  - w @19          | ########## | 54          | none           | 37
  - w @37          | ########## | 54          | 19             | none
  - r @54          | 19,37
