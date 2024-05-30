# Preval test case

# base_catch.md

> Ref tracking > Done > Throw > Base catch
>
> Base case

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  x = 2;
  throw 'abc';
} finally {
  x = 3;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
let $implicitThrow___8__ = false;
let $finalStep___12__ = false;
let $finalCatchArg___16__ = undefined___17__;
let $finalArg___20__ = undefined___21__;
$finally___23__: /*24*/ {
  try /*26*/ {
    x___30__ = 2;
    $finalStep___34__ = true;
    $finalArg___39__ = `abc`;
    break $finally___41__;
  } catch ($finalImplicit___43__) /*44*/ {
    $implicitThrow___48__ = true;
    $finalCatchArg___52__ = $finalImplicit___51__;
  }
}
x___56__ = 3;
if ($implicitThrow___58__) {
  /*59*/ throw $finalCatchArg___61__;
} /*62*/ else {
  if ($finalStep___64__) {
    /*65*/ throw $finalArg___67__;
  } /*68*/ else {
    $(x___72__);
  }
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 30,56
  - w @30      | ########## | not read    | 4              | 56
  - w @56      | ########## | 72          | 4,30           | none
  - r @72      | 56

$implicitThrow:
  - w @8           | ########## | 58          | none           | 48
  - w @48          | ########## | 58          | 8              | none
  - r @58          | 8,48

$finalStep:
  - w @12          | ########## | 64          | none           | 34
  - w @34          | ########## | 64          | 12             | none
  - r @64          | 12,34

$finalCatchArg:
  - w @16          | ########## | 61          | none           | 52
  - w @52          | ########## | 61          | 16             | none
  - r @61          | 16,52

$finalArg:
  - w @20          | ########## | 67          | none           | 39
  - w @39          | ########## | 67          | 20             | none
  - r @67          | 20,39
