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
let x___4__ = 1;
try /*7*/ {
  try /*9*/ {
    $(x___13__);
    x___17__ = 2;
  } catch (e___19__) /*20*/ {
    $(x___24__);
    const tmpIfTest___27__ = $();
    if (tmpIfTest___31__) {
      /*32*/ x___36__ = 3;
    } /*37*/ else {
    }
  }
} finally /*38*/ {
  $(x___42__);
  const tmpIfTest$1___45__ = $();
  if (tmpIfTest$1___49__) {
    /*50*/ x___54__ = 4;
  } /*55*/ else {
  }
}
$(x___59__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 13,24,42,59 | none           | 17,36,54
  - r @13      | 4
  - w @17      | ########## | 24,42,59    | 4              | 36,54
  - r @24      | 4,17
  - w @36      | ########## | 42,59       | 4,17           | 54
  - r @42      | 4,17,36
  - w @54      | ########## | 59          | 4,17,36        | none
  - r @59      | 4,17,36,54

tmpIfTest:
  - w @27      | ########## | 31          | none           | none
  - r @31      | 27

tmpIfTest$1:
  - w @45       | ########## | 49          | none           | none
  - r @49       | 45
