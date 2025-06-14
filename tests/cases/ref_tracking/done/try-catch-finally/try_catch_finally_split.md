# Preval test case

# try_catch_finally_split.md

> Ref tracking > Done > Try-catch-finally > Try catch finally split

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
    $(x);      // x=1 2
    x = 3;
  }
  $(x);        // x=2 3
} finally {
  $(x);        // x=1 2 3 
  if ($1) {
    x = 4;
  }
}
$(x);          // x=2 3 4. not 1: a throw in the Catch does not reach here
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___6__*/ x = 1;
let /*___9__*/ $implicitThrow = false;
let /*___12__*/ $finalCatchArg = /*___13__*/ undefined;
try /*15~40*/ {
  try /*17~25*/ {
    $(/*___21__*/ x);
    /*___25__*/ x = 2;
  } catch (/*___27__*/ e) /*28~36*/ {
    $(/*___32__*/ x);
    /*___36__*/ x = 3;
  }
  $(/*___40__*/ x);
} catch (/*___42__*/ $finalImplicit) /*43~51*/ {
  /*___47__*/ $implicitThrow = true;
  /*___51__*/ $finalCatchArg = /*___50__*/ $finalImplicit;
}
$(/*___55__*/ x);
if ($1) {
  /*58~62*/ /*___62__*/ x = 4;
} /*63~63*/ else {
}
if (/*___65__*/ $implicitThrow) {
  /*66~68*/ throw /*___68__*/ $finalCatchArg;
} /*69~73*/ else {
  $(/*___73__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 21,32,55,73 | none           | 25,36,62
  - r @21      | 6
  - w @25      | ########## | 32,40,55,73 | 6              | 36,62
  - r @32      | 6,25
  - w @36      | ########## | 40,55,73    | 6,25           | 62
  - r @40      | 25,36
  - r @55      | 6,25,36
  - w @62      | ########## | 73          | 6,25,36        | none
  - r @73      | 6,25,36,62

$implicitThrow:
  - w @9           | ########## | 65          | none           | 47
  - w @47          | ########## | 65          | 9              | none
  - r @65          | 9,47

$finalCatchArg:
  - w @12          | ########## | 68          | none           | 51
  - w @51          | ########## | 68          | 12             | none
  - r @68          | 12,51

e:
  - w @27          | ########## | not read    | none           | none

$finalImplicit:
  - w @42          | ########## | 50          | none           | none
  - r @50          | 42
