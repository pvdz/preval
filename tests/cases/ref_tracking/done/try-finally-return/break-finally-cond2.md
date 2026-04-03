# Preval test case

# break-finally-cond2.md

> Ref tracking > Done > Try-finally-return > Break-finally-cond2

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  try {
    x = 2;
  } finally {
    $(x); // x=1 2 (not sure how 1 could occur but for the sake of argument we assume the try block can throw anywhere)
  }

  $(x); // x=2 (only!)
}
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(5): */ let /*___6__*/ x = 1;
/* stmt(8): */ let /*___9__*/ $implicitThrow = false;
/* stmt(11): */ let /*___12__*/ $finalCatchArg = /*___13__*/ undefined;
/* stmt(14): */ try /*15~19*/ {
  /* stmt(16): */ /*___19__*/ x = 2;
} catch (/*___21__*/ $finalImplicit) /*22~28*/ {
  /* stmt(23): */ $(/*___26__*/ x);
  /* stmt(27): */ throw /*___28__*/ $finalImplicit;
}
/* stmt(29): */ $(/*___32__*/ x);
/* stmt(33): */ if (/*___34__*/ $implicitThrow) {
  /*35~37*/ /* stmt(36): */ throw /*___37__*/ $finalCatchArg;
} /*38~42*/ else {
  /* stmt(39): */ $(/*___42__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 26          | none           | 19
  - w @19      | ########## | 26,32,42    | 6              | none
  - r @26      | 6,19
  - r @32      | 19
  - r @42      | 19

$implicitThrow:
  - w @9           | ########## | 34          | none           | none
  - r @34          | 9

$finalCatchArg:
  - w @12          | ########## | 37          | none           | none
  - r @37          | 12

$finalImplicit:
  - w @21          | ########## | 28          | none           | none
  - r @28          | 21
