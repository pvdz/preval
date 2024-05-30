# Preval test case

# try_implicit_throw_catch.md

> Ref tracking > Done > Try-random > Try implicit throw catch
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x); // x=1
  try {
    try {
      $();
      x = 2;
    } finally {
      $(x); // x=1 2
    }
    x = 3;
  } catch {
    $(x); // x=1 2 3
    // What if we do x=4 here?
  }
  $(x); // x=1 2 3
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
try /*11*/ {
  let $implicitThrow___14__ = false;
  let $finalCatchArg___18__ = undefined___19__;
  try /*21*/ {
    $();
    x___28__ = 2;
  } catch ($finalImplicit___30__) /*31*/ {
    $implicitThrow___35__ = true;
    $finalCatchArg___39__ = $finalImplicit___38__;
  }
  $(x___43__);
  if ($implicitThrow___45__) {
    /*46*/ throw $finalCatchArg___48__;
  } /*49*/ else {
    x___53__ = 3;
  }
} catch (e___55__) /*56*/ {
  $(x___60__);
}
$(x___64__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,43,60,64  | none           | 28,53
  - r @9       | 4
  - w @28      | ########## | 43,60,64    | 4              | 53
  - r @43      | 4,28
  - w @53      | ########## | 60,64       | 4,28           | none
  - r @60      | 4,28,53
  - r @64      | 4,28,53

$implicitThrow:
  - w @14          | ########## | 45          | none           | 35
  - w @35          | ########## | 45          | 14             | none
  - r @45          | 14,35

$finalCatchArg:
  - w @18          | ########## | 48          | none           | 39
  - w @39          | ########## | 48          | 18             | none
  - r @48          | 18,39
