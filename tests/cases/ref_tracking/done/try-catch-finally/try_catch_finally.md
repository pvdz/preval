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
  $(a); // can observe 1
  a = 3;
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
  a___26__ = 3;
} finally /*27*/ {
  $(a___31__);
  const tmpIfTest___34__ = $();
  if (tmpIfTest___38__) {
    /*39*/ a___43__ = 4;
  } /*44*/ else {
  }
}
$(a___48__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 11,22,31,48 | none           | 15,26,43
  - r @11      | 4
  - w @15      | ########## | 22,31,48    | 4              | 26,43
  - r @22      | 4,15
  - w @26      | ########## | 31,48       | 4,15           | 43
  - r @31      | 4,15,26
  - w @43      | ########## | 48          | 4,15,26        | none
  - r @48      | 4,15,26,43

tmpIfTest:
  - w @34      | ########## | 38          | none           | none
  - r @38      | 34
