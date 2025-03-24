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
$(x); // unreachable (code always throws before this point)
`````


## Output

(Annotated with pids)

`````filename=intro
let x___8__ = 1;
let $implicitThrow___11__ = false;
let $finalStep___14__ = false;
let $finalCatchArg___17__ = undefined___18__;
let $finalArg___20__ = undefined___21__;
$finally___23__: /*24*/ {
  try /*26*/ {
    x___30__ = 2;
    $finalStep___34__ = true;
    $finalArg___39__ = `abc`;
    break $finally___41__;
  } catch ($finalImplicit___43__) /*44*/ {
    x___48__ = 3;
    throw $finalImplicit___50__;
  }
}
x___54__ = 3;
if ($implicitThrow___56__) {
  /*57*/ throw $finalCatchArg___59__;
} /*60*/ else {
  throw $finalArg___62__;
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @8       | ########## | not read    | none           | 30,48,54
  - w @30      | ########## | not read    | 8              | 48,54
  - w @48      | ########## | not read    | 8,30           | none
  - w @54      | ########## | not read    | 8,30           | none

$implicitThrow:
  - w @11          | ########## | 56          | none           | none
  - r @56          | 11

$finalStep:
  - w @14          | ########## | not read    | none           | 34
  - w @34          | ########## | not read    | 14             | none

$finalCatchArg:
  - w @17          | ########## | 59          | none           | none
  - r @59          | 17

$finalArg:
  - w @20          | ########## | 62          | none           | 39
  - w @39          | ########## | 62          | 20             | none
  - r @62          | 20,39
