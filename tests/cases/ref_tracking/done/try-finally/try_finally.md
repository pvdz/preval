# Preval test case

# try_finally.md

> Ref tracking > Done > Try-finally > Try finally

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can only observe 1
  a = 2;
} finally {
  $(a); // can observe 1 2 
  a = 3;
}
$(a);   // can only observe 3
        // (finally is always entered. if it succeeds it will overwrite a
        // and otherwise it won't execute the read at all. if it gets here
        // then a will always be 3)
`````


## Output

(Annotated with pids)

`````filename=intro
let a___6__ = 1;
let $implicitThrow___9__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  $(a___19__);
  a___23__ = 2;
} catch ($finalImplicit___25__) /*26*/ {
  $(a___30__);
  a___34__ = 3;
  throw $finalImplicit___36__;
}
$(a___40__);
a___44__ = 3;
if ($implicitThrow___46__) {
  /*47*/ throw $finalCatchArg___49__;
} /*50*/ else {
  $(a___54__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
a:
  - w @6       | ########## | 19,30       | none           | 23,34
  - r @19      | 6
  - w @23      | ########## | 30,40       | 6              | 34,44
  - r @30      | 6,23
  - w @34      | ########## | not read    | 6,23           | none
  - r @40      | 23
  - w @44      | ########## | 54          | 23             | none
  - r @54      | 44

$implicitThrow:
  - w @9           | ########## | 46          | none           | none
  - r @46          | 9

$finalCatchArg:
  - w @12          | ########## | 49          | none           | none
  - r @49          | 12
