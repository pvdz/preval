# Preval test case

# nested_if.md

> Ref tracking > Done > If-pure > Nested if

## Options

- refTest

## Input

`````js filename=intro
let a = 1;
if ($()) {
  $(a); // can observe 1
  a = 2;
  if (a) {
    $(a); // can observe 2
    a = 3;
  }
}
$(a); // can observe  1 2 3
`````


## Output

(Annotated with pids)

`````filename=intro
let a___4__ = 1;
const tmpIfTest___8__ = $();
if (tmpIfTest___12__) {
  /*13*/ $(a___17__);
  a___21__ = 2;
  if (a___23__) {
    /*24*/ $(a___28__);
    a___32__ = 3;
    $(a___36__);
  } /*37*/ else {
    $(a___41__);
  }
} /*42*/ else {
  $(a___46__);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 17,46       | none           | 21
  - r @17      | 4
  - w @21      | ########## | 23,28,41    | 4              | 32
  - r @23      | 21
  - r @28      | 21
  - w @32      | ########## | 36          | 21             | none
  - r @36      | 32
  - r @41      | 21
  - r @46      | 4

tmpIfTest:
  - w @8       | ########## | 12          | none           | none
  - r @12      | 8
