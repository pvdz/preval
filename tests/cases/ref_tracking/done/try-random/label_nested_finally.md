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
  let $implicitThrow___18__ = false;
  let $finalCatchArg___22__ = undefined___23__;
  try /*25*/ {
    $(x___29__);
    x___33__ = 3;
  } catch ($finalImplicit___35__) /*36*/ {
    $implicitThrow___40__ = true;
    $finalCatchArg___44__ = $finalImplicit___43__;
  }
  x___48__ = 6;
} catch (e$1___50__) /*51*/ {
  $(x___55__);
  x___59__ = 5;
}
$(x___63__);
`````

Ref tracking result:

                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 11,55       | none           | 15,59
  - r @11      | 4
  - w @15      | ########## | 29,55       | 4              | 33,48,59
  - r @29      | 15
  - w @33      | ########## | 55          | 15             | 48,59
  - w @48      | ########## | 55,63       | 15,33          | 59
  - r @55      | 4,15,33,48
  - w @59      | ########## | 63          | 4,15,33,48     | none
  - r @63      | 48,59

$implicitThrow:
  - w @18          | ########## | not read    | none           | 40
  - w @40          | ########## | not read    | 18             | none

$finalCatchArg:
  - w @22          | ########## | not read    | none           | 44
  - w @44          | ########## | not read    | 22             | none
