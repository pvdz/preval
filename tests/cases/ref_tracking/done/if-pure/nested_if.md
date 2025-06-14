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
let /*___5__*/ a = 1;
const /*___8__*/ tmpIfTest = $();
if (/*___12__*/ tmpIfTest) {
  /*13~41*/ $(/*___17__*/ a);
  /*___21__*/ a = 2;
  if (/*___23__*/ a) {
    /*24~36*/ $(/*___28__*/ a);
    /*___32__*/ a = 3;
    $(/*___36__*/ a);
  } /*37~41*/ else {
    $(/*___41__*/ a);
  }
} /*42~46*/ else {
  $(/*___46__*/ a);
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
a:
  - w @5       | ########## | 17,46       | none           | 21
  - r @17      | 5
  - w @21      | ########## | 23,28,41    | 5              | 32
  - r @23      | 21
  - r @28      | 21
  - w @32      | ########## | 36          | 21             | none
  - r @36      | 32
  - r @41      | 21
  - r @46      | 5

tmpIfTest:
  - w @8       | ########## | 12          | none           | none
  - r @12      | 8
