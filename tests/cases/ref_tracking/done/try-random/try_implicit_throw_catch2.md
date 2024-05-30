# Preval test case

# try_implicit_throw_catch2.md

> Ref tracking > Done > Try-random > Try implicit throw catch2
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
      $();        // if this throws x remains 1
      x = 2;
    } finally {
      $();
    }
  } catch {
    // this catch is the only reason why x=1 _can_ be observed
    $(x); // x=1 3
  }
  $(x); // x=1 3
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
  $();
  if ($implicitThrow___44__) {
    /*45*/ throw $finalCatchArg___47__;
  } /*48*/ else {
  }
} catch (e___50__) /*51*/ {
  $(x___55__);
}
$(x___59__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,55,59     | none           | 28
  - r @9       | 4
  - w @28      | ########## | 55,59       | 4              | none
  - r @55      | 4,28
  - r @59      | 4,28

$implicitThrow:
  - w @14          | ########## | 44          | none           | 35
  - w @35          | ########## | 44          | 14             | none
  - r @44          | 14,35

$finalCatchArg:
  - w @18          | ########## | 47          | none           | 39
  - w @39          | ########## | 47          | 18             | none
  - r @47          | 18,39
