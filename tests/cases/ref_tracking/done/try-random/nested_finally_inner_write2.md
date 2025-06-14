# Preval test case

# nested_finally_inner_write2.md

> Ref tracking > Done > Try-random > Nested finally inner write2
> 
> Regression where the x=2 write would not overwrite but 
> amend to the inner Try.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
A: {
  try {
    $(x);        // x=1
  } finally {
    $(x);        // x=1
    if ($1) {
      x = 2;
      break A;
    }
    try {
      $(x);      // x=1
    } finally {
      $(x);      // x=1
    }
  }
}
$(x);          // x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
/*___7__*/ A: /*8~86*/ {
  let /*___12__*/ $implicitThrow$1 = false;
  let /*___15__*/ $finalCatchArg$1 = /*___16__*/ undefined;
  try /*18~22*/ {
    $(/*___22__*/ x);
  } catch (/*___24__*/ $finalImplicit$1) /*25~33*/ {
    /*___29__*/ $implicitThrow$1 = true;
    /*___33__*/ $finalCatchArg$1 = /*___32__*/ $finalImplicit$1;
  }
  $(/*___37__*/ x);
  if ($1) {
    /*40~46*/ /*___44__*/ x = 2;
    break /*___46__*/ A;
  } /*47~86*/ else {
    let /*___51__*/ $implicitThrow = false;
    let /*___54__*/ $finalCatchArg = /*___55__*/ undefined;
    try /*57~61*/ {
      $(/*___61__*/ x);
    } catch (/*___63__*/ $finalImplicit) /*64~70*/ {
      $(/*___68__*/ x);
      throw /*___70__*/ $finalImplicit;
    }
    $(/*___74__*/ x);
    if (/*___76__*/ $implicitThrow) {
      /*77~79*/ throw /*___79__*/ $finalCatchArg;
    } /*80~86*/ else {
      if (/*___82__*/ $implicitThrow$1) {
        /*83~85*/ throw /*___85__*/ $finalCatchArg$1;
      } /*86~86*/ else {
      }
    }
  }
}
$(/*___90__*/ x);
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 22,37,61,68,74,90 | none           | 44
  - r @22      | 4
  - r @37      | 4
  - w @44      | ########## | 90          | 4              | none
  - r @61      | 4
  - r @68      | 4
  - r @74      | 4
  - r @90      | 4,44

$implicitThrow$1:
  - w @12            | ########## | 82          | none           | 29
  - w @29            | ########## | 82          | 12             | none
  - r @82            | 12,29

$finalCatchArg$1:
  - w @15            | ########## | 85          | none           | 33
  - w @33            | ########## | 85          | 15             | none
  - r @85            | 15,33

$finalImplicit$1:
  - w @24            | ########## | 32          | none           | none
  - r @32            | 24

$implicitThrow:
  - w @51            | ########## | 76          | none           | none
  - r @76            | 51

$finalCatchArg:
  - w @54            | ########## | 79          | none           | none
  - r @79            | 54

$finalImplicit:
  - w @63            | ########## | 70          | none           | none
  - r @70            | 63
