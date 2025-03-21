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
let x___4__ = 1;
A___7__: /*8*/ {
  let $implicitThrow$1___11__ = false;
  let $finalCatchArg$1___15__ = undefined___16__;
  try /*18*/ {
    $(x___22__);
  } catch ($finalImplicit$1___24__) /*25*/ {
    $implicitThrow$1___29__ = true;
    $finalCatchArg$1___33__ = $finalImplicit$1___32__;
  }
  $(x___37__);
  if ($1) {
    /*40*/ x___44__ = 2;
    break A___46__;
  } /*47*/ else {
    let $implicitThrow___50__ = false;
    let $finalCatchArg___54__ = undefined___55__;
    try /*57*/ {
      $(x___61__);
    } catch ($finalImplicit___63__) /*64*/ {
      $(x___68__);
      throw $finalImplicit___70__;
    }
    $(x___74__);
    if ($implicitThrow___76__) {
      /*77*/ throw $finalCatchArg___79__;
    } /*80*/ else {
      if ($implicitThrow$1___82__) {
        /*83*/ throw $finalCatchArg$1___85__;
      } /*86*/ else {
      }
    }
  }
}
$(x___90__);
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
  - w @11            | ########## | 82          | none           | 29
  - w @29            | ########## | 82          | 11             | none
  - r @82            | 11,29

$finalCatchArg$1:
  - w @15            | ########## | 85          | none           | 33
  - w @33            | ########## | 85          | 15             | none
  - r @85            | 15,33

$implicitThrow:
  - w @50            | ########## | 76          | none           | none
  - r @76            | 50

$finalCatchArg:
  - w @54            | ########## | 79          | none           | none
  - r @79            | 54
