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
const tmpIfTest___8__ = $(false);
if (tmpIfTest___13__) {
  /*14*/ x___18__ = 6;
} /*19*/ else {
}
$(x___23__);
$(x___27__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 23,27       | none           | 18
  - w @18      | ########## | 23,27       | 4              | none
  - r @23      | 4,18
  - r @27      | 4,18

tmpIfTest:
  - w @8       | ########## | 13          | none           | none
  - r @13      | 8
