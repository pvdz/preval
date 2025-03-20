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
    $(x___44__);
    throw $finalImplicit___46__;
  }
  $(x___50__);
  if ($implicitThrow___52__) {
    /*53*/ throw $finalCatchArg___55__;
  } /*56*/ else {
    $(x___60__);
  }
} catch (e___62__) /*63*/ {
  try /*65*/ {
    $(x___69__);
  } catch ($finalImplicit$1___71__) /*72*/ {
    $(x___76__);
    throw $finalImplicit$1___78__;
  }
}
$(x___82__);
if ($implicitThrow$1___84__) {
  /*85*/ throw $finalCatchArg$1___87__;
} /*88*/ else {
  $(x___92__);
}
`````


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,33,44,69,76,82,92 | none           | 37
  - r @9       | 4
  - r @33      | 4
  - w @37      | ########## | 44,50,60,69,76,82,92 | 4              | none
  - r @44      | 4,37
  - r @50      | 37
  - r @60      | 37
  - r @69      | 4,37
  - r @76      | 4,37
  - r @82      | 4,37
  - r @92      | 4,37

$implicitThrow$1:
  - w @12            | ########## | 84          | none           | none
  - r @84            | 12

$finalCatchArg$1:
  - w @16            | ########## | 87          | none           | none
  - r @87            | 16

$implicitThrow:
  - w @22            | ########## | 52          | none           | none
  - r @52            | 22

$finalCatchArg:
  - w @26            | ########## | 55          | none           | none
  - r @55            | 26
