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
  $(a___30__);
  a___34__ = 4;
  throw $finalImplicit___36__;
}
$(a___40__);
a___44__ = 4;
if ($implicitThrow___46__) {
  /*47*/ throw $finalCatchArg___49__;
} /*50*/ else {
  $(a___54__);
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 19,30       | none           | 23,34
  - r @19      | 4
  - w @23      | ########## | 30,40       | 4              | 34,44
  - r @30      | 4,23
  - w @34      | ########## | not read    | 4,23           | none
  - r @40      | 23
  - w @44      | ########## | 54          | 23             | none
  - r @54      | 44

$implicitThrow:
  - w @8           | ########## | 46          | none           | none
  - r @46          | 8

$finalCatchArg:
  - w @12          | ########## | 49          | none           | none
  - r @49          | 12
