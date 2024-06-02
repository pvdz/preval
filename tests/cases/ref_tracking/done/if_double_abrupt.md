# Preval test case

# if_double_abrupt.md

> Ref tracking > Done > If double abrupt

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
foo: {
  x = 2;
  if ($1) {
    x = 3;
    break foo;
  } else {
    x = 4;
    break foo;
  }
  $(x);  // unreachable, but shouldn't reference 3 or 4 as it gets scheduled to the foo label parent
  x = 5; // unreachable
}
$(x); // 3 or 4
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
foo___7__: /*8*/ {
  x___12__ = 2;
  if ($1) {
    /*15*/ x___19__ = 3;
    break foo___21__;
  } /*22*/ else {
    x___26__ = 4;
    break foo___28__;
  }
}
$(x___32__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | not read    | none           | 12
  - w @12      | ########## | not read    | 4              | 19,26
  - w @19      | ########## | 32          | 12             | none
  - w @26      | ########## | 32          | 12             | none
  - r @32      | 19,26
