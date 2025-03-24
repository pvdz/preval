# Preval test case

# try_break_finally.md

> Ref tracking > Done > Try break finally
>
> The last read can't reach 1 at all.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
abc: try { 
  break abc;
} finally {
  x = 2; // overwrites x=1
}
$(x); // x=2
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
abc___7__: /*8*/ {
  let $implicitThrow___13__ = false;
  let $finalStep___16__ = false;
  let $finalCatchArg___19__ = undefined___20__;
  $finally___22__: /*23*/ {
    try /*25*/ {
      $finalStep___29__ = true;
      break $finally___31__;
    } catch ($finalImplicit___33__) /*34*/ {
      x___38__ = 2;
      throw $finalImplicit___40__;
    }
  }
  x___44__ = 2;
  if ($implicitThrow___46__) {
    /*47*/ throw $finalCatchArg___49__;
  } /*50*/ else {
    break abc___52__;
  }
}
$(x___56__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 38,44
  - w @38      | ########## | not read    | 4              | none
  - w @44      | ########## | 56          | 4              | none
  - r @56      | 44

$implicitThrow:
  - w @13          | ########## | 46          | none           | none
  - r @46          | 13

$finalStep:
  - w @16          | ########## | not read    | none           | 29
  - w @29          | ########## | not read    | 16             | none

$finalCatchArg:
  - w @19          | ########## | 49          | none           | none
  - r @49          | 19
