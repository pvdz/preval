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
  } /*33*/ else {
  }
} /*34*/ else {
}
$(a___38__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
a:
  - w @4       | ########## | 17,38       | none           | 21
  - r @17      | 4
  - w @21      | ########## | 23,28       | 4              | 32
  - r @23      | 21
  - r @28      | 21
  - w @32      | ########## | not read    | 21             | none
  - r @38      | 4

tmpIfTest:
  - w @8       | ########## | 12          | none           | none
  - r @12      | 8
