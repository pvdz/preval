# Preval test case

# try_catch_finally2.md

> Ref tracking > Done > Try-catch-finally > Try catch finally2

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} catch (e) {
  $(a); // can observe 1
  if ($()) {
    a = 3;
  }
} finally {
  $(a); // can observe 1 2 3 
  if ($()) {
    a = 4;
  }
}
$(a); // can observe 1, 2, 3, and 4
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
try /*7*/ {
  $(a___11__);
  a___15__ = 2;
} catch (e___17__) /*18*/ {
  $(a___22__);
  const tmpIfTest___25__ = $();
  if (tmpIfTest___29__) {
    /*30*/ a___34__ = 3;
  } /*35*/ else {
  }
} finally /*36*/ {
  $(a___40__);
  const tmpIfTest$1___43__ = $();
  if (tmpIfTest$1___47__) {
    /*48*/ a___52__ = 4;
  } /*53*/ else {
  }
}
$(a___57__);
`````

Ref tracking result:

                | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 57          | none           | none
  - r @11      | none (TDZ?)
  - w @15      | ########## | not read    | none           | none
  - r @22      | none (TDZ?)
  - w @34      | ########## | not read    | none           | none
  - r @40      | none (TDZ?)
  - w @52      | ########## | not read    | none           | none
  - r @57      | 4

tmpIfTest:
  - w @25      | ########## | 29          | none           | none
  - r @29      | 25

tmpIfTest$1:
  - w @43       | ########## | 47          | none           | none
  - r @47       | 43
