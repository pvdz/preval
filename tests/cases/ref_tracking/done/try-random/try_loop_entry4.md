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
  /*12*/ let $implicitThrow___15__ = false;
  let $finalStep___19__ = false;
  let $finalCatchArg___23__ = undefined___24__;
  $finally___26__: /*27*/ {
    try /*29*/ {
      $(x___33__);
      x___37__ = 2;
      $finalStep___41__ = true;
      break $finally___43__;
    } catch ($finalImplicit___45__) /*46*/ {
      $implicitThrow___50__ = true;
      $finalCatchArg___54__ = $finalImplicit___53__;
    }
  }
  $(x___58__);
  if ($implicitThrow___60__) {
    /*61*/ throw $finalCatchArg___63__;
  } /*64*/ else {
    break;
  }
}
$(x___69__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,33,58,69  | none           | 37
  - r @9       | 4
  - r @33      | 4
  - w @37      | ########## | 58,69       | 4              | none
  - r @58      | 4,37
  - r @69      | 4,37

$implicitThrow:
  - w @15          | ########## | 60          | none           | 50
  - w @50          | ########## | 60          | 15             | none
  - r @60          | 15,50

$finalStep:
  - w @19          | ########## | not read    | none           | 41
  - w @41          | ########## | not read    | 19             | none

$finalCatchArg:
  - w @23          | ########## | 63          | none           | 54
  - w @54          | ########## | 63          | 23             | none
  - r @63          | 23,54
