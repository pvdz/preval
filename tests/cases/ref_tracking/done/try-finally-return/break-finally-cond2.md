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
let x___4__ = 1;
let $implicitThrow___8__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  x___19__ = 2;
} catch ($finalImplicit___21__) /*22*/ {
  $implicitThrow___26__ = true;
  $finalCatchArg___30__ = $finalImplicit___29__;
}
$(x___34__);
if ($implicitThrow___36__) {
  /*37*/ throw $finalCatchArg___39__;
} /*40*/ else {
  $(x___44__);
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 34,44       | none           | 19
  - w @19      | ########## | 34,44       | 4              | none
  - r @34      | 4,19
  - r @44      | 4,19

$implicitThrow:
  - w @8           | ########## | 36          | none           | 26
  - w @26          | ########## | 36          | 8              | none
  - r @36          | 8,26

$finalCatchArg:
  - w @12          | ########## | 39          | none           | 30
  - w @30          | ########## | 39          | 12             | none
  - r @39          | 12,30
