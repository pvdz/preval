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
let x___4__ = 1;
let $implicitThrow___8__ = false;
let $finalCatchArg___12__ = undefined___13__;
try /*15*/ {
  try /*17*/ {
    $(x___21__);
    x___25__ = 2;
  } catch (e___27__) /*28*/ {
    $(x___32__);
    x___36__ = 3;
  }
  $(x___40__);
} catch ($finalImplicit___42__) /*43*/ {
  $implicitThrow___47__ = true;
  $finalCatchArg___51__ = $finalImplicit___50__;
}
$(x___55__);
if ($1) {
  /*58*/ x___62__ = 4;
} /*63*/ else {
}
if ($implicitThrow___65__) {
  /*66*/ throw $finalCatchArg___68__;
} /*69*/ else {
  $(x___73__);
}
`````


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21,32,55,73 | none           | 25,36,62
  - r @21      | 4
  - w @25      | ########## | 32,40,55,73 | 4              | 36,62
  - r @32      | 4,25
  - w @36      | ########## | 40,55,73    | 4,25           | 62
  - r @40      | 25,36
  - r @55      | 4,25,36
  - w @62      | ########## | 73          | 4,25,36        | none
  - r @73      | 4,25,36,62

$implicitThrow:
  - w @8           | ########## | 65          | none           | 47
  - w @47          | ########## | 65          | 8              | none
  - r @65          | 8,47

$finalCatchArg:
  - w @12          | ########## | 68          | none           | 51
  - w @51          | ########## | 68          | 12             | none
  - r @68          | 12,51
