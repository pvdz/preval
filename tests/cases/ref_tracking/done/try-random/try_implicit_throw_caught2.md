# Preval test case

# try_implicit_throw_caught2.md

> Ref tracking > Done > Try-random > Try implicit throw caught2
>
> Demonstrating why the implicit throw is a thing we must handle
> very explicitly somehow.

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  $(x);         // x=1
  try {
    try {
      try {
        $(x);   // x=1
        x = 2;
      } finally {
        $(x);   // x=1 2
      }
      $(x);     // x=2. Cannot be 1 because that's only possible under a throw.
    } catch {
      $(x);     // x=1 2
    }
  } finally {
    $(x);       // x=1 2
  }
  $(x);         // x=1 2
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
$(x___9__);
let $implicitThrow$1___12__ = false;
let $finalCatchArg$1___16__ = undefined___17__;
try /*19*/ {
  try /*21*/ {
    let $implicitThrow___24__ = false;
    let $finalCatchArg___28__ = undefined___29__;
    try /*31*/ {
      $(x___35__);
      x___39__ = 2;
    } catch ($finalImplicit___41__) /*42*/ {
      $implicitThrow___46__ = true;
      $finalCatchArg___50__ = $finalImplicit___49__;
    }
    $(x___54__);
    if ($implicitThrow___56__) {
      /*57*/ throw $finalCatchArg___59__;
    } /*60*/ else {
      $(x___64__);
    }
  } catch (e___66__) /*67*/ {
    $(x___71__);
  }
} catch ($finalImplicit$1___73__) /*74*/ {
  $implicitThrow$1___78__ = true;
  $finalCatchArg$1___82__ = $finalImplicit$1___81__;
}
$(x___86__);
if ($implicitThrow$1___88__) {
  /*89*/ throw $finalCatchArg$1___91__;
} /*92*/ else {
  $(x___96__);
}
`````

Ref tracking result:

                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,35,54,64,71,86,96 | none           | 39
  - r @9       | 4
  - r @35      | 4
  - w @39      | ########## | 54,64,71,86,96 | 4              | none
  - r @54      | 4,39
  - r @64      | 4,39
  - r @71      | 4,39
  - r @86      | 4,39
  - r @96      | 4,39

$implicitThrow$1:
  - w @12            | ########## | 88          | none           | 78
  - w @78            | ########## | 88          | 12             | none
  - r @88            | 12,78

$finalCatchArg$1:
  - w @16            | ########## | 91          | none           | 82
  - w @82            | ########## | 91          | 16             | none
  - r @91            | 16,82

$implicitThrow:
  - w @24            | ########## | 56          | none           | 46
  - w @46            | ########## | 56          | 24             | none
  - r @56            | 24,46

$finalCatchArg:
  - w @28            | ########## | 59          | none           | 50
  - w @50            | ########## | 59          | 28             | none
  - r @59            | 28,50
