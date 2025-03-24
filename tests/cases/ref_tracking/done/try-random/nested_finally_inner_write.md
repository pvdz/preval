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
let x___8__ = 1;
let $implicitThrow$1___11__ = false;
let $finalCatchArg$1___14__ = undefined___15__;
try /*17*/ {
  $(x___21__);
} catch ($finalImplicit$1___23__) /*24*/ {
  $implicitThrow$1___28__ = true;
  $finalCatchArg$1___32__ = $finalImplicit$1___31__;
}
$(x___36__);
x___40__ = 2;
let $implicitThrow___42__ = false;
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


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @8       | ########## | 21,36       | none           | 40
  - r @21      | 8
  - r @36      | 8
  - w @40      | ########## | 52,59,65,81 | 8              | none
  - r @52      | 40
  - r @59      | 40
  - r @65      | 40
  - r @81      | 40

$implicitThrow$1:
  - w @11            | ########## | 73          | none           | 28
  - w @28            | ########## | 73          | 11             | none
  - r @73            | 11,28

$finalCatchArg$1:
  - w @14            | ########## | 76          | none           | 32
  - w @32            | ########## | 76          | 14             | none
  - r @76            | 14,32

$implicitThrow:
  - w @42            | ########## | 67          | none           | none
  - r @67            | 42

$finalCatchArg:
  - w @45            | ########## | 70          | none           | none
  - r @70            | 45
