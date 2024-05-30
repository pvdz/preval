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
  let $implicitThrow___14__ = false;
  let $finalCatchArg___18__ = undefined___19__;
  try /*21*/ {
    $(x___25__);
    x___29__ = 2;
  } catch ($finalImplicit___31__) /*32*/ {
    $implicitThrow___36__ = true;
    $finalCatchArg___40__ = $finalImplicit___39__;
  }
  $(x___44__);
  if ($implicitThrow___46__) {
    /*47*/ throw $finalCatchArg___49__;
  } /*50*/ else {
    x___54__ = 3;
  }
} catch (e___56__) /*57*/ {
  $(x___61__);
  x___65__ = 4;
}
$(x___69__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 9,25,44,61  | none           | 29,54,65
  - r @9       | 4
  - r @25      | 4
  - w @29      | ########## | 44,61       | 4              | 54,65
  - r @44      | 4,29
  - w @54      | ########## | 61,69       | 4,29           | 65
  - r @61      | 4,29,54
  - w @65      | ########## | 69          | 4,29,54        | none
  - r @69      | 54,65

$implicitThrow:
  - w @14          | ########## | 46          | none           | 36
  - w @36          | ########## | 46          | 14             | none
  - r @46          | 14,36

$finalCatchArg:
  - w @18          | ########## | 49          | none           | 40
  - w @40          | ########## | 49          | 18             | none
  - r @49          | 18,40
