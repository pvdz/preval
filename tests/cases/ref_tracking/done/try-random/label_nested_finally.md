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
  $(x___13__);
  x___17__ = 2;
  let $implicitThrow___19__ = false;
  let $finalCatchArg___22__ = undefined___23__;
  try /*25*/ {
    $(x___29__);
    x___33__ = 3;
  } catch (e___35__) /*36*/ {
    try /*38*/ {
      $(x___42__);
      x___46__ = 4;
    } catch ($finalImplicit___48__) /*49*/ {
      $implicitThrow___53__ = true;
      $finalCatchArg___57__ = $finalImplicit___56__;
    }
  }
  x___61__ = 6;
} catch (e$1___63__) /*64*/ {
  $(x___68__);
  x___72__ = 5;
}
$(x___76__);
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,68       | none           | 17,72
  - r @13      | 4
  - w @17      | ########## | 29,42,68    | 4              | 33,46,61,72
  - r @29      | 17
  - w @33      | ########## | 42,68       | 17             | 46,61,72
  - r @42      | 17,33
  - w @46      | ########## | 68          | 17,33          | 61,72
  - w @61      | ########## | 68,76       | 17,33,46       | 72
  - r @68      | 4,17,33,46,61
  - w @72      | ########## | 76          | 4,17,33,46,61  | none
  - r @76      | 61,72

$implicitThrow:
  - w @19          | ########## | not read    | none           | 53
  - w @53          | ########## | not read    | 19             | none

$finalCatchArg:
  - w @22          | ########## | not read    | none           | 57
  - w @57          | ########## | not read    | 22             | none
