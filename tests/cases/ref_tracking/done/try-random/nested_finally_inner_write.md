# Preval test case

# nested_finally_inner_write.md

> Ref tracking > Done > Try-random > Nested finally inner write
> 
> Regression where the x=2 write would not overwrite but 
> amend to the inner Try.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);        // x=1
} finally {
  $(x);        // x=1
  x = 2;
  try {
    $(x);      // x=2
  } finally {
    $(x);      // x=2
  }
}
$(x);          // x=2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
let $implicitThrow$1___8__ = false;
let $finalCatchArg$1___12__ = undefined___13__;
try /*15*/ {
  $(x___19__);
} catch ($finalImplicit$1___21__) /*22*/ {
  $implicitThrow$1___26__ = true;
  $finalCatchArg$1___30__ = $finalImplicit$1___29__;
}
$(x___34__);
x___38__ = 2;
let $implicitThrow___41__ = false;
let $finalCatchArg___45__ = undefined___46__;
try /*48*/ {
  $(x___52__);
} catch ($finalImplicit___54__) /*55*/ {
  $implicitThrow___59__ = true;
  $finalCatchArg___63__ = $finalImplicit___62__;
}
$(x___67__);
if ($implicitThrow___69__) {
  /*70*/ throw $finalCatchArg___72__;
} /*73*/ else {
  if ($implicitThrow$1___75__) {
    /*76*/ throw $finalCatchArg$1___78__;
  } /*79*/ else {
    $(x___83__);
  }
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,34       | none           | 38
  - r @19      | 4
  - r @34      | 4
  - w @38      | ########## | 52,67,83    | 4              | none
  - r @52      | 38
  - r @67      | 38
  - r @83      | 38

$implicitThrow$1:
  - w @8             | ########## | 75          | none           | 26
  - w @26            | ########## | 75          | 8              | none
  - r @75            | 8,26

$finalCatchArg$1:
  - w @12            | ########## | 78          | none           | 30
  - w @30            | ########## | 78          | 12             | none
  - r @78            | 12,30

$implicitThrow:
  - w @41            | ########## | 69          | none           | 59
  - w @59            | ########## | 69          | 41             | none
  - r @69            | 41,59

$finalCatchArg:
  - w @45            | ########## | 72          | none           | 63
  - w @63            | ########## | 72          | 45             | none
  - r @72            | 45,63
