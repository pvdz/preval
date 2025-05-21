# Preval test case

# try_implicit_throw_catch_assign.md

> Ref tracking > Done > Try-random > Try implicit throw catch assign
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
      $(x); // x=1
      x = 2;
    } finally {
      $(x); // x=1 2
    }
    x = 3;
  } catch {
    $(x); // x=1 2 3
    x = 4;
  }
  $(x); // x=3 4
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
    $(x___25__);
    x___29__ = 2;
  } catch ($finalImplicit___31__) /*32*/ {
    $(x___36__);
    throw $finalImplicit___38__;
  }
  $(x___42__);
  if ($implicitThrow___44__) {
    /*45*/ throw $finalCatchArg___47__;
  } /*48*/ else {
    x___52__ = 3;
  }
} catch (e___54__) /*55*/ {
  $(x___59__);
  x___63__ = 4;
}
$(x___67__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,25,36,59  | none           | 29,63
  - r @9       | 4
  - r @25      | 4
  - w @29      | ########## | 36,42,59    | 4              | 52,63
  - r @36      | 4,29
  - r @42      | 29
  - w @52      | ########## | 59,67       | 29             | 63
  - r @59      | 4,29,52
  - w @63      | ########## | 67          | 4,29,52        | none
  - r @67      | 52,63

$implicitThrow:
  - w @15          | ########## | 44          | none           | none
  - r @44          | 15

$finalCatchArg:
  - w @18          | ########## | 47          | none           | none
  - r @47          | 18

$finalImplicit:
  - w @31          | ########## | 38          | none           | none
  - r @38          | 31

e:
  - w @54          | ########## | not read    | none           | none
