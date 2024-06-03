# Preval test case

# while10.md

> Ref tracking > Done > While-continue > While10
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
      continue;
    }
  }
}
$(x); // unreachable
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ while (true) {
    /*11*/ $continue___13__: /*14*/ {
      if ($) {
        /*17*/ $(x___21__);
      } /*22*/ else {
        $(x___26__);
        x___30__ = 2;
        break $continue___32__;
      }
    }
  }
}
$(x___36__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21,26       | none           | 30
  - r @21      | 4,30
  - r @26      | 4,30
  - w @30      | ########## | 21,26       | 4,30           | 30
  - r @36      | none (unreachable?)
