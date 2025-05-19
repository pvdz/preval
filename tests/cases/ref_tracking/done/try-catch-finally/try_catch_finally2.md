# Preval test case

# try_catch_finally2.md

> Ref tracking > Done > Try-catch-finally > Try catch finally2

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);         // x=1
  x = 2;
} catch (e) {
  $(x);         // x=1 (2) (x can only not be 2 if something throws after hte assignment completes, which I think is impossible, but we'll fix that later)
  if ($()) {
    x = 3;
  }
} finally {
  $(x);         // x=1 2 3 
  if ($()) {
    x = 4;
  }
}
$(x);           // x=1 2 3 4
`````


## Output

(Annotated with pids)

`````filename=intro
let x___7__ = 1;
let $implicitThrow___10__ = false;
let $finalCatchArg___13__ = undefined___14__;
try /*16*/ {
  $(x___20__);
  x___24__ = 2;
} catch (e___26__) /*27*/ {
  try /*29*/ {
    $(x___34__);
    const tmpIfTest___36__ = $();
    if (tmpIfTest___40__) {
      /*41*/ x___45__ = 3;
    } /*46*/ else {
    }
  } catch ($finalImplicit___48__) /*49*/ {
    $implicitThrow___53__ = true;
    $finalCatchArg___57__ = $finalImplicit___56__;
  }
}
$(x___61__);
const tmpIfTest$1___63__ = $();
if (tmpIfTest$1___67__) {
  /*68*/ x___72__ = 4;
} /*73*/ else {
}
if ($implicitThrow___75__) {
  /*76*/ throw $finalCatchArg___78__;
} /*79*/ else {
  $(x___83__);
}
`````


## Todos triggered


None


## Ref tracking result


                   | reads      | read by     | overWrites     | overwritten by
x:
  - w @7       | ########## | 20,34,61,83 | none           | 24,45,72
  - r @20      | 7
  - w @24      | ########## | 34,61,83    | 7              | 45,72
  - r @34      | 7,24
  - w @45      | ########## | 61,83       | 7,24           | 72
  - r @61      | 7,24,45
  - w @72      | ########## | 83          | 7,24,45        | none
  - r @83      | 7,24,45,72

$implicitThrow:
  - w @10          | ########## | 75          | none           | 53
  - w @53          | ########## | 75          | 10             | none
  - r @75          | 10,53

$finalCatchArg:
  - w @13          | ########## | 78          | none           | 57
  - w @57          | ########## | 78          | 13             | none
  - r @78          | 13,57

tmpIfTest:
  - w @36          | ########## | 40          | none           | none
  - r @40          | 36

tmpIfTest$1:
  - w @63          | ########## | 67          | none           | none
  - r @67          | 63
