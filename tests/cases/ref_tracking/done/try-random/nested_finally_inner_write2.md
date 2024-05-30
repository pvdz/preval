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
      $implicitThrow___68__ = true;
      $finalCatchArg___72__ = $finalImplicit___71__;
    }
    $(x___76__);
    if ($implicitThrow___78__) {
      /*79*/ throw $finalCatchArg___81__;
    } /*82*/ else {
      if ($implicitThrow$1___84__) {
        /*85*/ throw $finalCatchArg$1___87__;
      } /*88*/ else {
      }
    }
  }
}
$(x___92__);
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 22,37,61,76,92 | none           | 44
  - r @22      | 4
  - r @37      | 4
  - w @44      | ########## | 92          | 4              | none
  - r @61      | 4
  - r @76      | 4
  - r @92      | 4,44

$implicitThrow$1:
  - w @11            | ########## | 84          | none           | 29
  - w @29            | ########## | 84          | 11             | none
  - r @84            | 11,29

$finalCatchArg$1:
  - w @15            | ########## | 87          | none           | 33
  - w @33            | ########## | 87          | 15             | none
  - r @87            | 15,33

$implicitThrow:
  - w @50            | ########## | 78          | none           | 68
  - w @68            | ########## | 78          | 50             | none
  - r @78            | 50,68

$finalCatchArg:
  - w @54            | ########## | 81          | none           | 72
  - w @72            | ########## | 81          | 54             | none
  - r @81            | 54,72
