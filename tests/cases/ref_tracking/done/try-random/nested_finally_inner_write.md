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
  $(x___59__);
  throw $finalImplicit___61__;
}
$(x___65__);
if ($implicitThrow___67__) {
  /*68*/ throw $finalCatchArg___70__;
} /*71*/ else {
  if ($implicitThrow$1___73__) {
    /*74*/ throw $finalCatchArg$1___76__;
  } /*77*/ else {
    $(x___81__);
  }
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,34       | none           | 38
  - r @19      | 4
  - r @34      | 4
  - w @38      | ########## | 52,59,65,81 | 4              | none
  - r @52      | 38
  - r @59      | 38
  - r @65      | 38
  - r @81      | 38

$implicitThrow$1:
  - w @8             | ########## | 73          | none           | 26
  - w @26            | ########## | 73          | 8              | none
  - r @73            | 8,26

$finalCatchArg$1:
  - w @12            | ########## | 76          | none           | 30
  - w @30            | ########## | 76          | 12             | none
  - r @76            | 12,30

$implicitThrow:
  - w @41            | ########## | 67          | none           | none
  - r @67            | 41

$finalCatchArg:
  - w @45            | ########## | 70          | none           | none
  - r @70            | 45
