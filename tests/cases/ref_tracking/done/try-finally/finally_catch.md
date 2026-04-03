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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ try /*7~62*/ {
  /* stmt(10): */ $(/*___13__*/ x);
  /* stmt(14): */ /*___17__*/ x = 2;
  /* stmt(18): */ let /*___19__*/ $implicitThrow = false;
  /* stmt(21): */ let /*___22__*/ $finalCatchArg = /*___23__*/ undefined;
  /* stmt(24): */ try /*25~33*/ {
    /* stmt(26): */ $(/*___29__*/ x);
    /* stmt(30): */ /*___33__*/ x = 3;
  } catch (/*___35__*/ $finalImplicit) /*36~44*/ {
    /* stmt(37): */ /*___40__*/ $implicitThrow = true;
    /* stmt(41): */ /*___44__*/ $finalCatchArg = /*___43__*/ $finalImplicit;
  }
  /* stmt(45): */ $(/*___48__*/ x);
  /* stmt(49): */ /*___52__*/ x = 4;
  /* stmt(53): */ $(/*___56__*/ x);
  /* stmt(57): */ if (/*___58__*/ $implicitThrow) {
    /*59~61*/ /* stmt(60): */ throw /*___61__*/ $finalCatchArg;
  } /*62~62*/ else {
  }
} catch (/*___64__*/ e) /*65~77*/ {
  /* stmt(66): */ $(/*___69__*/ x);
  /* stmt(70): */ /*___73__*/ x = 5;
  /* stmt(74): */ $(/*___77__*/ x);
}
/* stmt(78): */ $(/*___81__*/ x);
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
