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
  $(x); // 5 or 6
  break;
}
$(x); // 5 or 6
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
  - w @4       | ########## | 26,31       | none           | 21
  - w @21      | ########## | 26,31       | 4              | none
  - r @26      | 4,21
  - r @31      | 4,21

tmpIfTest:
  - w @11      | ########## | 16          | none           | none
  - r @16      | 11
