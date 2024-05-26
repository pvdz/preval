# Preval test case

# try_finally.md

> Ref tracking > Done > Try-finally > Try finally

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
try {
  $(a); // can only observe 1
  a = 2;
} finally {
  $(a); // can observe 1 2 
  a = 3;
}
$(a);   // can only observe 3
        // (finally is always entered. if it succeeds it will overwrite a
        // and otherwise it won't execute the read at all. if it gets here
        // then a will always be 3)
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
  a___24__ = 3;
}
$(a___28__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 11,20       | none           | 15,24
  - r @11      | 4
  - w @15      | ########## | 20          | 4              | 24
  - r @20      | 4,15
  - w @24      | ########## | 28          | 4,15           | none
  - r @28      | 24