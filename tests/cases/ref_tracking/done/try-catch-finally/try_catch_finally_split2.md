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
} catch ($finalImplicit___38__) /*39*/ {
  $implicitThrow___43__ = true;
  $finalCatchArg___47__ = $finalImplicit___46__;
}
$(x___51__);
if ($implicitThrow___53__) {
  /*54*/ throw $finalCatchArg___56__;
} /*57*/ else {
  $(x___61__);
}
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21,32,51,61 | none           | 25,36
  - r @21      | 4
  - w @25      | ########## | 32,51,61    | 4              | 36
  - r @32      | 4,25
  - w @36      | ########## | 51,61       | 4,25           | none
  - r @51      | 4,25,36
  - r @61      | 4,25,36

$implicitThrow:
  - w @8           | ########## | 53          | none           | 43
  - w @43          | ########## | 53          | 8              | none
  - r @53          | 8,43

$finalCatchArg:
  - w @12          | ########## | 56          | none           | 47
  - w @47          | ########## | 56          | 12             | none
  - r @56          | 12,47
