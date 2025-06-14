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
let /*___6__*/ x = 1;
$(/*___11__*/ x);
let /*___13__*/ $implicitThrow$1 = false;
let /*___16__*/ $finalCatchArg$1 = /*___17__*/ undefined;
try /*19~60*/ {
  let /*___23__*/ $implicitThrow = false;
  let /*___26__*/ $finalCatchArg = /*___27__*/ undefined;
  try /*29~37*/ {
    $(/*___33__*/ x);
    /*___37__*/ x = 2;
  } catch (/*___39__*/ $finalImplicit) /*40~46*/ {
    $(/*___44__*/ x);
    throw /*___46__*/ $finalImplicit;
  }
  $(/*___50__*/ x);
  if (/*___52__*/ $implicitThrow) {
    /*53~55*/ throw /*___55__*/ $finalCatchArg;
  } /*56~60*/ else {
    $(/*___60__*/ x);
  }
} catch (/*___62__*/ e) /*63~78*/ {
  try /*65~69*/ {
    $(/*___69__*/ x);
  } catch (/*___71__*/ $finalImplicit$1) /*72~78*/ {
    $(/*___76__*/ x);
    throw /*___78__*/ $finalImplicit$1;
  }
}
$(/*___82__*/ x);
if (/*___84__*/ $implicitThrow$1) {
  /*85~87*/ throw /*___87__*/ $finalCatchArg$1;
} /*88~92*/ else {
  $(/*___92__*/ x);
}
`````


## Todos triggered


None


## Ref tracking result


                     | reads      | read by     | overWrites     | overwritten by
x:
  - w @6       | ########## | 11,33,44,69,76,82,92 | none           | 37
  - r @11      | 6
  - r @33      | 6
  - w @37      | ########## | 44,50,60,69,76,82,92 | 6              | none
  - r @44      | 6,37
  - r @50      | 37
  - r @60      | 37
  - r @69      | 6,37
  - r @76      | 6,37
  - r @82      | 6,37
  - r @92      | 6,37

$implicitThrow$1:
  - w @13            | ########## | 84          | none           | none
  - r @84            | 13

$finalCatchArg$1:
  - w @16            | ########## | 87          | none           | none
  - r @87            | 16

$implicitThrow:
  - w @23            | ########## | 52          | none           | none
  - r @52            | 23

$finalCatchArg:
  - w @26            | ########## | 55          | none           | none
  - r @55            | 26

$finalImplicit:
  - w @39            | ########## | 46          | none           | none
  - r @46            | 39

e:
  - w @62            | ########## | not read    | none           | none

$finalImplicit$1:
  - w @71            | ########## | 78          | none           | none
  - r @78            | 71
