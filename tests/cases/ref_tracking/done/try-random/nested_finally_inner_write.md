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
let /*___8__*/ x = 1;
let /*___11__*/ $implicitThrow$1 = false;
let /*___14__*/ $finalCatchArg$1 = /*___15__*/ undefined;
try /*17~21*/ {
  $(/*___21__*/ x);
} catch (/*___23__*/ $finalImplicit$1) /*24~32*/ {
  /*___28__*/ $implicitThrow$1 = true;
  /*___32__*/ $finalCatchArg$1 = /*___31__*/ $finalImplicit$1;
}
$(/*___36__*/ x);
/*___40__*/ x = 2;
let /*___42__*/ $implicitThrow = false;
let /*___45__*/ $finalCatchArg = /*___46__*/ undefined;
try /*48~52*/ {
  $(/*___52__*/ x);
} catch (/*___54__*/ $finalImplicit) /*55~61*/ {
  $(/*___59__*/ x);
  throw /*___61__*/ $finalImplicit;
}
$(/*___65__*/ x);
if (/*___67__*/ $implicitThrow) {
  /*68~70*/ throw /*___70__*/ $finalCatchArg;
} /*71~81*/ else {
  if (/*___73__*/ $implicitThrow$1) {
    /*74~76*/ throw /*___76__*/ $finalCatchArg$1;
  } /*77~81*/ else {
    $(/*___81__*/ x);
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

$finalImplicit$1:
  - w @23            | ########## | 31          | none           | none
  - r @31            | 23

$implicitThrow:
  - w @42            | ########## | 67          | none           | none
  - r @67            | 42

$finalCatchArg:
  - w @45            | ########## | 70          | none           | none
  - r @70            | 45

$finalImplicit:
  - w @54            | ########## | 61          | none           | none
  - r @61            | 54
