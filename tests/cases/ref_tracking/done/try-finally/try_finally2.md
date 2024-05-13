# Preval test case

# try_finally2.md

> Ref tracking > Done > Try-finally > Try finally2

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can observe 1
  a = 2;
} finally {
  $(a); // can observe 1 2 
  if ($()) {
    a = 3;
  }
}
$(a); // can observe 1, 2, and 3
      // (the write 3 is conditional and the finally could be
      // entered before or after write 2 so it can observe 1,2,3)
`````

## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
try /*7*/ {
  $(a___11__);
  a___15__ = 2;
} finally /*16*/ {
  $(a___20__);
  const tmpIfTest___23__ = $();
  if (tmpIfTest___27__) {
    /*28*/ a___32__ = 3;
  } /*33*/ else {
  }
}
$(a___37__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 11,20,37    | none           | 15,32
  - r @11      | 4
  - w @15      | ########## | 20,37       | 4              | 32
  - r @20      | 4,15
  - w @32      | ########## | 37          | 4,15           | none
  - r @37      | 15,4,32

tmpIfTest:
  - w @23      | ########## | 27          | none           | none
  - r @27      | 23
