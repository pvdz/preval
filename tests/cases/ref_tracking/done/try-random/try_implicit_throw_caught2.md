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
  let $implicitThrow___22__ = false;
  let $finalCatchArg___26__ = undefined___27__;
  try /*29*/ {
    $(x___33__);
    x___37__ = 2;
  } catch ($finalImplicit___39__) /*40*/ {
    $implicitThrow___44__ = true;
    $finalCatchArg___48__ = $finalImplicit___47__;
  }
  $(x___52__);
  if ($implicitThrow___54__) {
    /*55*/ throw $finalCatchArg___57__;
  } /*58*/ else {
    $(x___62__);
  }
} catch (e___64__) /*65*/ {
  try /*67*/ {
    $(x___71__);
  } catch ($finalImplicit$1___73__) /*74*/ {
    $implicitThrow$1___78__ = true;
    $finalCatchArg$1___82__ = $finalImplicit$1___81__;
  }
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
  - w @4       | ########## | 9,33,52,62,71,86,96 | none           | 37
  - r @9       | 4
  - r @33      | 4
  - w @37      | ########## | 52,62,71,86,96 | 4              | none
  - r @52      | 4,37
  - r @62      | 4,37
  - r @71      | 4,37
  - r @86      | 4,37
  - r @96      | 4,37

$implicitThrow$1:
  - w @12            | ########## | 88          | none           | 78
  - w @78            | ########## | 88          | 12             | none
  - r @88            | 12,78

$finalCatchArg$1:
  - w @16            | ########## | 91          | none           | 82
  - w @82            | ########## | 91          | 16             | none
  - r @91            | 16,82

$implicitThrow:
  - w @22            | ########## | 54          | none           | 44
  - w @44            | ########## | 54          | 22             | none
  - r @54            | 22,44

$finalCatchArg:
  - w @26            | ########## | 57          | none           | 48
  - w @48            | ########## | 57          | 26             | none
  - r @57            | 26,48
