# Preval test case

# try_finally.md

> Ref tracking > Done > Try-finally > Try finally

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
  a = 3;
}
$(a); // can observe 3
      // (finally is always entered. if it succeeds it will overwrite a
      // and otherwise it won't execute the read at all)
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
  - w @4       | ########## | 28          | none           | none
  - r @11      | none (TDZ?)
  - w @15      | ########## | not read    | none           | none
  - r @20      | none (TDZ?)
  - w @24      | ########## | not read    | none           | none
  - r @28      | 4
