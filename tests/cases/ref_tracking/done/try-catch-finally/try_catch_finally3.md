# Preval test case

# try_catch_finally3.md

> Ref tracking > Done > Try-catch-finally > Try catch finally3

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
try {
  $(x);           // x=1
  x = 2;
  try {
    $(x);         // x=2
    x = 3;
  } catch (e) {
    $(x);         // x=2 3
    x = 4;
  } finally {
    $(x);         // x=2 3 4 
    if ($()) {
      x = 5;
    }
  }
} catch (e) {
  $(x);           // x=1 2 3 4 5
  x = 6;
} finally {
  $(x);           // x=1 2 3 4 5 6 
  if ($()) {
    x = 7;
  }
}
// Note that 1 and 2 can not reach here because it means that
// the catch threw before overwriting x, but in that case the
// code skips this after leaving the finally.
$(x);             // x=3 4 5 6 7
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
try /*7*/ {
  try /*9*/ {
    $(x___13__);
    x___17__ = 2;
    try /*19*/ {
      try /*21*/ {
        $(x___25__);
        x___29__ = 3;
      } catch (e___31__) /*32*/ {
        $(x___36__);
        x___40__ = 4;
      }
    } finally /*41*/ {
      $(x___45__);
      const tmpIfTest___48__ = $();
      if (tmpIfTest___52__) {
        /*53*/ x___57__ = 5;
      } /*58*/ else {
      }
    }
  } catch (e$1___60__) /*61*/ {
    $(x___65__);
    x___69__ = 6;
  }
} finally /*70*/ {
  $(x___74__);
  const tmpIfTest$1___77__ = $();
  if (tmpIfTest$1___81__) {
    /*82*/ x___86__ = 7;
  } /*87*/ else {
  }
}
$(x___91__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,65,74    | none           | 17,69,86
  - r @13      | 4
  - w @17      | ########## | 25,36,45,65,74 | 4              | 29,40,57,69,86
  - r @25      | 17
  - w @29      | ########## | 36,45,65,74,91 | 17             | 40,57,69,86
  - r @36      | 17,29
  - w @40      | ########## | 45,65,74,91 | 17,29          | 57,69,86
  - r @45      | 17,29,40
  - w @57      | ########## | 65,74,91    | 17,29,40       | 69,86
  - r @65      | 4,17,29,40,57
  - w @69      | ########## | 74,91       | 4,17,29,40,57  | 86
  - r @74      | 4,17,29,40,57,69
  - w @86      | ########## | 91          | 4,17,29,40,57,69 | none
  - r @91      | 29,40,57,69,86

tmpIfTest:
  - w @48      | ########## | 52          | none           | none
  - r @52      | 48

tmpIfTest$1:
  - w @77       | ########## | 81          | none           | none
  - r @81       | 77
