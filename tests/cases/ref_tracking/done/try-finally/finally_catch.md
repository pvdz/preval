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
let /*___4__*/ x = 1;
try /*7~62*/ {
  $(/*___13__*/ x);
  /*___17__*/ x = 2;
  let /*___19__*/ $implicitThrow = false;
  let /*___22__*/ $finalCatchArg = /*___23__*/ undefined;
  try /*25~33*/ {
    $(/*___29__*/ x);
    /*___33__*/ x = 3;
  } catch (/*___35__*/ $finalImplicit) /*36~44*/ {
    /*___40__*/ $implicitThrow = true;
    /*___44__*/ $finalCatchArg = /*___43__*/ $finalImplicit;
  }
  $(/*___48__*/ x);
  /*___52__*/ x = 4;
  $(/*___56__*/ x);
  if (/*___58__*/ $implicitThrow) {
    /*59~61*/ throw /*___61__*/ $finalCatchArg;
  } /*62~62*/ else {
  }
} catch (/*___64__*/ e) /*65~77*/ {
  $(/*___69__*/ x);
  /*___73__*/ x = 5;
  $(/*___77__*/ x);
}
$(/*___81__*/ x);
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
