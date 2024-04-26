# Preval test case

# while9.md

> Ref tracking > Done > While-if > While9
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  while (true) {
    if ($) {
      $(x); // Can still see 2 due to outer loop
    } else {
      $(x);
      x = 2;
      break;
    }
  }
}
$(x);
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ while (true) {
    /*11*/ if ($) {
      /*14*/ $(x___18__);
    } /*19*/ else {
      $(x___23__);
      x___27__ = 2;
      break;
    }
  }
}
$(x___32__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 32          | none           | none
  - r @18      | none (TDZ?)
  - r @23      | none (TDZ?)
  - w @27      | ########## | not read    | none           | none
  - r @32      | 4
