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
let x___4__ = 1;
let $implicitThrow___8__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  $(x___19__);
  x___23__ = 2;
} catch ($finalImplicit___25__) /*26*/ {
  $implicitThrow___30__ = true;
  $finalCatchArg___34__ = $finalImplicit___33__;
}
$(x___38__);
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


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 19,38,61    | none           | 23,50
  - r @19      | 4
  - w @23      | ########## | 38,61       | 4              | 50
  - r @38      | 4,23
  - w @50      | ########## | 61          | 4,23           | none
  - r @61      | 4,23,50

$implicitThrow:
  - w @8           | ########## | 53          | none           | 30
  - w @30          | ########## | 53          | 8              | none
  - r @53          | 8,30

$finalCatchArg:
  - w @12          | ########## | 56          | none           | 34
  - w @34          | ########## | 56          | 12             | none
  - r @56          | 12,34

tmpIfTest:
  - w @41          | ########## | 45          | none           | none
  - r @45          | 41
