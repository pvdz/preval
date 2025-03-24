# Preval test case

# try_catch_finally2.md

> Ref tracking > Done > Try-catch-finally > Try catch finally2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);         // x=1
  x = 2;
} catch (e) {
  $(x);         // x=1 (2) (x can only not be 2 if something throws after hte assignment completes, which I think is impossible, but we'll fix that later)
  if ($()) {
    x = 3;
  }
} finally {
  $(x);         // x=1 2 3 
  if ($()) {
    x = 4;
  }
}
$(x);           // x=1 2 3 4
`````


## Output

(Annotated with pids)

`````filename=intro
let x___7__ = 1;
let $implicitThrow___10__ = false;
let $finalCatchArg___13__ = undefined___14__;
try /*16*/ {
  $(x___20__);
  x___24__ = 2;
} catch ($finalImplicit___26__) /*27*/ {
  $implicitThrow___31__ = true;
  $finalCatchArg___35__ = $finalImplicit___34__;
}
$(x___39__);
const tmpIfTest___41__ = $();
if (tmpIfTest___45__) {
  /*46*/ x___50__ = 4;
} /*51*/ else {
}
if ($implicitThrow___53__) {
  /*54*/ throw $finalCatchArg___56__;
} /*57*/ else {
  $(x___61__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @7       | ########## | 20,39,61    | none           | 24,50
  - r @20      | 7
  - w @24      | ########## | 39,61       | 7              | 50
  - r @39      | 7,24
  - w @50      | ########## | 61          | 7,24           | none
  - r @61      | 7,24,50

$implicitThrow:
  - w @10          | ########## | 53          | none           | 31
  - w @31          | ########## | 53          | 10             | none
  - r @53          | 10,31

$finalCatchArg:
  - w @13          | ########## | 56          | none           | 35
  - w @35          | ########## | 56          | 13             | none
  - r @56          | 13,35

tmpIfTest:
  - w @41          | ########## | 45          | none           | none
  - r @45          | 41
