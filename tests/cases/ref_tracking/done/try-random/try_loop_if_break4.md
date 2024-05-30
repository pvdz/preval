# Preval test case

# try_loop_if_break4.md

> Ref tracking > Done > Try-random > Try loop if break4
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
        break;
      }
      x = 2;  // Does not overwrite itself because it does not loop
      $(x);   // x=2
      break;
    }
  }
  $(x);       // x=1 2
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
  $(x___41__);
  if ($1) {
    /*44*/ break;
  } /*46*/ else {
    x___50__ = 2;
    $(x___54__);
    break;
  }
}
$(x___59__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,26,41,59  | none           | 50
  - r @9       | 4
  - r @26      | 4
  - r @41      | 4
  - w @50      | ########## | 54,59       | 4              | none
  - r @54      | 50
  - r @59      | 4,50

$implicitThrow:
  - w @15          | ########## | not read    | none           | 33
  - w @33          | ########## | not read    | 15             | none

$finalCatchArg:
  - w @19          | ########## | not read    | none           | 37
  - w @37          | ########## | not read    | 19             | none
