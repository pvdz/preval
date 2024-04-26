# Preval test case

# loop_boundary3.md

> Ref tracking > Done > While-if > Loop boundary3

## Options

- refTest

## Input

`````js filename=intro
let x = 5;
while (true) { 
  if ($(false)) {
    x = 6;
  }
  $(x);
  break;
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 5;
while (true) {
  /*8*/ const tmpIfTest___11__ = $(false);
  if (tmpIfTest___16__) {
    /*17*/ x___21__ = 6;
  } /*22*/ else {
  }
  $(x___26__);
  break;
}
$(x___31__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 31          | none           | none
  - w @21      | ########## | not read    | none           | none
  - r @26      | none (TDZ?)
  - r @31      | 4

tmpIfTest:
  - w @11      | ########## | 16          | none           | none
  - r @16      | 11
