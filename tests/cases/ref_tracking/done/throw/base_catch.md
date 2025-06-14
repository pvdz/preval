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
let /*___8__*/ x = 1;
let /*___11__*/ $implicitThrow = false;
let /*___14__*/ $finalStep = false;
let /*___17__*/ $finalCatchArg = /*___18__*/ undefined;
let /*___20__*/ $finalArg = /*___21__*/ undefined;
/*___23__*/ $finally: /*24~50*/ {
  try /*26~41*/ {
    /*___30__*/ x = 2;
    /*___34__*/ $finalStep = true;
    /*___39__*/ $finalArg = `abc`;
    break /*___41__*/ $finally;
  } catch (/*___43__*/ $finalImplicit) /*44~50*/ {
    /*___48__*/ x = 3;
    throw /*___50__*/ $finalImplicit;
  }
}
/*___54__*/ x = 3;
if (/*___56__*/ $implicitThrow) {
  /*57~59*/ throw /*___59__*/ $finalCatchArg;
} /*60~62*/ else {
  throw /*___62__*/ $finalArg;
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

$finalImplicit:
  - w @43          | ########## | 50          | none           | none
  - r @50          | 43
