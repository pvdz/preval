# Preval test case

# try_loop_entry4.md

> Ref tracking > Done > Try-random > Try loop entry4
>
> The entryReads and entryWrites for a Try must be propagated which is relevant for loops.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);       // x=1
  while (true) { // never loops
    try {
      $(x);   // x=1 (not 2)
      x = 2;  // Does not overwrite itself because it does not loop
      break;
    } finally {
      $(x);   // x=1 2
    }
  }
  $(x);       // x=2
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
while (true) {
  /*12*/ let $implicitThrow___17__ = false;
  let $finalStep___20__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  $finally___26__: /*27*/ {
    try /*29*/ {
      $(x___33__);
      x___37__ = 2;
      $finalStep___41__ = true;
      break $finally___43__;
    } catch ($finalImplicit___45__) /*46*/ {
      $(x___50__);
      throw $finalImplicit___52__;
    }
  }
  $(x___56__);
  if ($implicitThrow___58__) {
    /*59*/ throw $finalCatchArg___61__;
  } /*62*/ else {
    break;
  }
}
$(x___67__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,33,50,56,67 | none           | 37
  - r @9       | 4
  - r @33      | 4
  - w @37      | ########## | 50,56,67    | 4              | none
  - r @50      | 4,37
  - r @56      | 4,37
  - r @67      | 4,37

$implicitThrow:
  - w @17          | ########## | 58          | none           | none
  - r @58          | 17

$finalStep:
  - w @20          | ########## | not read    | none           | 41
  - w @41          | ########## | not read    | 20             | none

$finalCatchArg:
  - w @23          | ########## | 61          | none           | none
  - r @61          | 23
