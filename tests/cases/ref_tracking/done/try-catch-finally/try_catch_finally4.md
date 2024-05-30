# Preval test case

# try_catch_finally4.md

> Ref tracking > Done > Try-catch-finally > Try catch finally4

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} catch {
  $(a); // can observe 1 2
  a = 3;
} finally {
  $(a); // can observe 1 2 3
  a = 4;
}
$(a); // x=4. anything else is an uncaught throw.
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
a___42__ = 4;
if ($implicitThrow___44__) {
  /*45*/ throw $finalCatchArg___47__;
} /*48*/ else {
  $(a___52__);
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 19,38       | none           | 23,42
  - r @19      | 4
  - w @23      | ########## | 38          | 4              | 42
  - r @38      | 4,23
  - w @42      | ########## | 52          | 4,23           | none
  - r @52      | 42

$implicitThrow:
  - w @8           | ########## | 44          | none           | 30
  - w @30          | ########## | 44          | 8              | none
  - r @44          | 8,30

$finalCatchArg:
  - w @12          | ########## | 47          | none           | 34
  - w @34          | ########## | 47          | 12             | none
  - r @47          | 12,34
