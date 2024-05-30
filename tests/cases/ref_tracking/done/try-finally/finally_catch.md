# Preval test case

# finally_catch.md

> Ref tracking > Done > Try-finally > Finally catch

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);       // x=1
  x = 2;
  try {
    $(x);     // x=2
    x = 3;
  } finally {
    $(x);     // x=2 3
    x = 4;
    $(x);     // x=4
  }
} catch {
  $(x);       // x=1 2 3 4
  x = 5;
  $(x);       // x=5
}
$(x);         // x=4 5
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
  let $implicitThrow___18__ = false;
  let $finalCatchArg___22__ = undefined___23__;
  try /*25*/ {
    $(x___29__);
    x___33__ = 3;
  } catch ($finalImplicit___35__) /*36*/ {
    $implicitThrow___40__ = true;
    $finalCatchArg___44__ = $finalImplicit___43__;
  }
  $(x___48__);
  x___52__ = 4;
  $(x___56__);
  if ($implicitThrow___58__) {
    /*59*/ throw $finalCatchArg___61__;
  } /*62*/ else {
  }
} catch (e___64__) /*65*/ {
  $(x___69__);
  x___73__ = 5;
  $(x___77__);
}
$(x___81__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,69       | none           | 15,73
  - r @11      | 4
  - w @15      | ########## | 29,48,69    | 4              | 33,52,73
  - r @29      | 15
  - w @33      | ########## | 48,69       | 15             | 52,73
  - r @48      | 15,33
  - w @52      | ########## | 56,69,81    | 15,33          | 73
  - r @56      | 52
  - r @69      | 4,15,33,52
  - w @73      | ########## | 77,81       | 4,15,33,52     | none
  - r @77      | 73
  - r @81      | 52,73

$implicitThrow:
  - w @18          | ########## | 58          | none           | 40
  - w @40          | ########## | 58          | 18             | none
  - r @58          | 18,40

$finalCatchArg:
  - w @22          | ########## | 61          | none           | 44
  - w @44          | ########## | 61          | 22             | none
  - r @61          | 22,44
