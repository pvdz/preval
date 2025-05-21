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
  $(x___13__);
  x___17__ = 2;
  let $implicitThrow___19__ = false;
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


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,69       | none           | 17,73
  - r @13      | 4
  - w @17      | ########## | 29,48,69    | 4              | 33,52,73
  - r @29      | 17
  - w @33      | ########## | 48,69       | 17             | 52,73
  - r @48      | 17,33
  - w @52      | ########## | 56,69,81    | 17,33          | 73
  - r @56      | 52
  - r @69      | 4,17,33,52
  - w @73      | ########## | 77,81       | 4,17,33,52     | none
  - r @77      | 73
  - r @81      | 52,73

$implicitThrow:
  - w @19          | ########## | 58          | none           | 40
  - w @40          | ########## | 58          | 19             | none
  - r @58          | 19,40

$finalCatchArg:
  - w @22          | ########## | 61          | none           | 44
  - w @44          | ########## | 61          | 22             | none
  - r @61          | 22,44

$finalImplicit:
  - w @35          | ########## | 43          | none           | none
  - r @43          | 35

e:
  - w @64          | ########## | not read    | none           | none
