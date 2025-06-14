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
let /*___4__*/ x = 1;
try /*7~61*/ {
  $(/*___13__*/ x);
  /*___17__*/ x = 2;
  let /*___19__*/ $implicitThrow = false;
  let /*___22__*/ $finalCatchArg = /*___23__*/ undefined;
  try /*25~33*/ {
    $(/*___29__*/ x);
    /*___33__*/ x = 3;
  } catch (/*___35__*/ e) /*36~57*/ {
    try /*38~46*/ {
      $(/*___42__*/ x);
      /*___46__*/ x = 4;
    } catch (/*___48__*/ $finalImplicit) /*49~57*/ {
      /*___53__*/ $implicitThrow = true;
      /*___57__*/ $finalCatchArg = /*___56__*/ $finalImplicit;
    }
  }
  /*___61__*/ x = 6;
} catch (/*___63__*/ e$1) /*64~72*/ {
  $(/*___68__*/ x);
  /*___72__*/ x = 5;
}
$(/*___76__*/ x);
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

e:
  - w @35          | ########## | not read    | none           | none

$finalImplicit:
  - w @48          | ########## | 56          | none           | none
  - r @56          | 48

e$1:
  - w @63          | ########## | not read    | none           | none
