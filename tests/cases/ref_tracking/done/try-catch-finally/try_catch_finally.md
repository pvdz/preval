# Preval test case

# try_catch_finally.md

> Ref tracking > Done > Try-catch-finally > Try catch finally

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} catch (e) {
  $(a); // can observe 1 2
  a = 3;
} finally {
  $(a); // can observe 1 2 3 
  if ($()) {
    a = 4;
  }
}
$(a); // can observe 2, 3, and 4. not 1: that's an uncaught throw.
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
try /*7*/ {
  try /*9*/ {
    $(a___13__);
    a___17__ = 2;
  } catch (e___19__) /*20*/ {
    $(a___24__);
    a___28__ = 3;
  }
} finally /*29*/ {
  $(a___33__);
  const tmpIfTest___36__ = $();
  if (tmpIfTest___40__) {
    /*41*/ a___45__ = 4;
  } /*46*/ else {
  }
}
$(a___50__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 13,24,33    | none           | 17,28,45
  - r @13      | 4
  - w @17      | ########## | 24,33,50    | 4              | 28,45
  - r @24      | 4,17
  - w @28      | ########## | 33,50       | 4,17           | 45
  - r @33      | 4,17,28
  - w @45      | ########## | 50          | 4,17,28        | none
  - r @50      | 17,28,45

tmpIfTest:
  - w @36      | ########## | 40          | none           | none
  - r @40      | 36
