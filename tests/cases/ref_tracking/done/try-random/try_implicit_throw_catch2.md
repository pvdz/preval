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
  let $implicitThrow___15__ = false;
  let $finalCatchArg___18__ = undefined___19__;
  try /*21*/ {
    $();
    x___28__ = 2;
  } catch ($finalImplicit___30__) /*31*/ {
    $();
    throw $finalImplicit___36__;
  }
  $();
  if ($implicitThrow___41__) {
    /*42*/ throw $finalCatchArg___44__;
  } /*45*/ else {
  }
} catch (e___47__) /*48*/ {
  $(x___52__);
}
$(x___56__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,52,56     | none           | 28
  - r @9       | 4
  - w @28      | ########## | 52,56       | 4              | none
  - r @52      | 4,28
  - r @56      | 4,28

$implicitThrow:
  - w @15          | ########## | 41          | none           | none
  - r @41          | 15

$finalCatchArg:
  - w @18          | ########## | 44          | none           | none
  - r @44          | 18
