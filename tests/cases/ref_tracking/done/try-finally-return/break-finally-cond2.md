# Preval test case

# break-finally-cond2.md

> Ref tracking > Done > Try-finally-return > Break-finally-cond2

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  try {
    x = 2;
  } finally {
    $(x); // x=1 2 (not sure how 1 could occur but for the sake of argument we assume the try block can throw anywhere)
  }

  $(x); // x=2 (only!)
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___6__ = 1;
let $implicitThrow___9__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  x___19__ = 2;
} catch ($finalImplicit___21__) /*22*/ {
  $(x___26__);
  throw $finalImplicit___28__;
}
$(x___32__);
if ($implicitThrow___34__) {
  /*35*/ throw $finalCatchArg___37__;
} /*38*/ else {
  $(x___42__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 26          | none           | 19
  - w @19      | ########## | 26,32,42    | 6              | none
  - r @26      | 6,19
  - r @32      | 19
  - r @42      | 19

$implicitThrow:
  - w @9           | ########## | 34          | none           | none
  - r @34          | 9

$finalCatchArg:
  - w @12          | ########## | 37          | none           | none
  - r @37          | 12

$finalImplicit:
  - w @21          | ########## | 28          | none           | none
  - r @28          | 21
