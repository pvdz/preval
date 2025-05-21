# Preval test case

# try_catch_finally_split2.md

> Ref tracking > Done > Try-catch-finally > Try catch finally split2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  try {
    $(x);      // x=1
    x = 2;
  } catch (e) {
    $(x);      // x=1 2. but if it throws then 1 won't reach the end
    x = 3;
  }
} finally {
  $(x);        // x=1 2 3. would trap a throw inside the catch
}
$(x);          // x=2 3. if the catch throws then that won't reach here.
`````


## Output

(Annotated with pids)

`````filename=intro
let x___6__ = 1;
let $implicitThrow___9__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  $(x___19__);
  x___23__ = 2;
} catch (e___25__) /*26*/ {
  try /*28*/ {
    $(x___32__);
    x___36__ = 3;
  } catch ($finalImplicit___38__) /*39*/ {
    $(x___43__);
    throw $finalImplicit___45__;
  }
}
$(x___49__);
if ($implicitThrow___51__) {
  /*52*/ throw $finalCatchArg___54__;
} /*55*/ else {
  $(x___59__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 19,32,43    | none           | 23,36
  - r @19      | 6
  - w @23      | ########## | 32,43,49,59 | 6              | 36
  - r @32      | 6,23
  - w @36      | ########## | 43,49,59    | 6,23           | none
  - r @43      | 6,23,36
  - r @49      | 23,36
  - r @59      | 23,36

$implicitThrow:
  - w @9           | ########## | 51          | none           | none
  - r @51          | 9

$finalCatchArg:
  - w @12          | ########## | 54          | none           | none
  - r @54          | 12

e:
  - w @25          | ########## | not read    | none           | none

$finalImplicit:
  - w @38          | ########## | 45          | none           | none
  - r @45          | 38
