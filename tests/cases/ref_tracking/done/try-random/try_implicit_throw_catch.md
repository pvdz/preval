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
  let $implicitThrow___15__ = false;
  let $finalCatchArg___18__ = undefined___19__;
  try /*21*/ {
    $();
    x___28__ = 2;
  } catch ($finalImplicit___30__) /*31*/ {
    $(x___35__);
    throw $finalImplicit___37__;
  }
  $(x___41__);
  if ($implicitThrow___43__) {
    /*44*/ throw $finalCatchArg___46__;
  } /*47*/ else {
    x___51__ = 3;
  }
} catch (e___53__) /*54*/ {
  $(x___58__);
}
$(x___62__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,35,58,62  | none           | 28
  - r @9       | 4
  - w @28      | ########## | 35,41,58,62 | 4              | 51
  - r @35      | 4,28
  - r @41      | 28
  - w @51      | ########## | 58,62       | 28             | none
  - r @58      | 4,28,51
  - r @62      | 4,28,51

$implicitThrow:
  - w @15          | ########## | 43          | none           | none
  - r @43          | 15

$finalCatchArg:
  - w @18          | ########## | 46          | none           | none
  - r @46          | 18
