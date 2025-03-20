# Preval test case

# try_catch_finally.md

> Ref tracking > Done > Try-catch-finally > Try catch finally

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} catch (e) {
  $(a); // can observe 1 2
  a = 3;
} finally {
  $(a); // can observe 1 2 3 
  if ($()) {
    a = 4;
  }
}
$(a); // can observe 2, 3, and 4. not 1: that's an uncaught throw.
`````


## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
let $implicitThrow___8__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  $(a___19__);
  a___23__ = 2;
} catch ($finalImplicit___25__) /*26*/ {
  $implicitThrow___30__ = true;
  $finalCatchArg___34__ = $finalImplicit___33__;
}
$(a___38__);
const tmpIfTest___41__ = $();
if (tmpIfTest___45__) {
  /*46*/ a___50__ = 4;
} /*51*/ else {
}
if ($implicitThrow___53__) {
  /*54*/ throw $finalCatchArg___56__;
} /*57*/ else {
  $(a___61__);
}
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
a:
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
