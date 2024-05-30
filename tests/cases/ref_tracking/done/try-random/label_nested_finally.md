# Preval test case

# label_nested_finally.md

> Ref tracking > Done > Try-random > Label nested finally

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);
  x = 2;
  A: {
    try {
      $(x);
      x = 3;
    } catch {
      $(x);
      x = 4;
    } finally {
      break A;
    }
  }
  x = 6;
} catch {
  $(x);
  x = 5;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  $(x___11__);
  x___15__ = 2;
  A___17__: /*18*/ {
    let $implicitThrow___21__ = false;
    let $finalCatchArg___25__ = undefined___26__;
    try /*28*/ {
      $(x___32__);
      x___36__ = 3;
    } catch ($finalImplicit___38__) /*39*/ {
      $implicitThrow___43__ = true;
      $finalCatchArg___47__ = $finalImplicit___46__;
    }
    break A___49__;
  }
  x___53__ = 6;
} catch (e$1___55__) /*56*/ {
  $(x___60__);
  x___64__ = 5;
}
$(x___68__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,60       | none           | 15,64
  - r @11      | 4
  - w @15      | ########## | 32,60       | 4              | 36,53,64
  - r @32      | 15
  - w @36      | ########## | 60          | 15             | 53,64
  - w @53      | ########## | 60,68       | 15,36          | 64
  - r @60      | 4,15,36,53
  - w @64      | ########## | 68          | 4,15,36,53     | none
  - r @68      | 53,64

$implicitThrow:
  - w @21          | ########## | not read    | none           | 43
  - w @43          | ########## | not read    | 21             | none

$finalCatchArg:
  - w @25          | ########## | not read    | none           | 47
  - w @47          | ########## | not read    | 25             | none
