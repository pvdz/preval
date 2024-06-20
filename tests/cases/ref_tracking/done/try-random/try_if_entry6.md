# Preval test case

# try_if_entry6.md

> Ref tracking > Done > Try-random > Try if entry6
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
      if ($) {
        $(x);
        x = 2; // Does overwrite itself
      }
    } finally {
      
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
    if ($) {
      /*25*/ $(x___29__);
      x___33__ = 2;
    } /*34*/ else {
    }
  } catch ($finalImplicit___36__) /*37*/ {
    $implicitThrow___41__ = true;
    $finalCatchArg___45__ = $finalImplicit___44__;
  }
  if ($implicitThrow___47__) {
    /*48*/ throw $finalCatchArg___50__;
  } /*51*/ else {
  }
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,29        | none           | 33
  - r @9       | 4
  - r @29      | 4,33
  - w @33      | ########## | 29          | 4,33           | 33

$implicitThrow:
  - w @15          | ########## | 47          | none           | 41
  - w @41          | ########## | 47          | 15             | none
  - r @47          | 15,41

$finalCatchArg:
  - w @19          | ########## | 50          | none           | 45
  - w @45          | ########## | 50          | 19             | none
  - r @50          | 19,45
