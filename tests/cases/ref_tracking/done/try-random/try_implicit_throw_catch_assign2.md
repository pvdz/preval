# Preval test case

# try_implicit_throw_catch_assign2.md

> Ref tracking > Done > Try-random > Try implicit throw catch assign2
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
    $(x); // x=2. Cannot be 1 because that's only possible under a throw.
  } catch {
    $(x); // x=1 2
    x = 3;
  }
  $(x); // x=2 3
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
    $(x___52__);
  }
} catch (e___54__) /*55*/ {
  $(x___59__);
  x___63__ = 3;
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
  - w @29      | ########## | 36,42,52,59,67 | 4              | 63
  - r @36      | 4,29
  - r @42      | 29
  - r @52      | 29
  - r @59      | 4,29
  - w @63      | ########## | 67          | 4,29           | none
  - r @67      | 29,63

$implicitThrow:
  - w @14          | ########## | 44          | none           | none
  - r @44          | 14

$finalCatchArg:
  - w @18          | ########## | 47          | none           | none
  - r @47          | 18
