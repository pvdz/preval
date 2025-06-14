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
let /*___6__*/ x = 1;
let /*___9__*/ $implicitThrow = false;
let /*___12__*/ $finalCatchArg = /*___13__*/ undefined;
try /*15~23*/ {
  $(/*___19__*/ x);
  /*___23__*/ x = 2;
} catch (/*___25__*/ e) /*26~45*/ {
  try /*28~36*/ {
    $(/*___32__*/ x);
    /*___36__*/ x = 3;
  } catch (/*___38__*/ $finalImplicit) /*39~45*/ {
    $(/*___43__*/ x);
    throw /*___45__*/ $finalImplicit;
  }
}
$(/*___49__*/ x);
if (/*___51__*/ $implicitThrow) {
  /*52~54*/ throw /*___54__*/ $finalCatchArg;
} /*55~59*/ else {
  $(/*___59__*/ x);
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
