# Preval test case

# while_continue_label1.md

> Ref tracking > Tofix > While continue label1
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
again: while (true) {
  while (true) {
    if ($) {
      $(x); // 1 2
    } else {
      $(x); // 1 2
      x = 2;
      continue again;
    }
  }
  // the loop never breaks and the continue always skips over this. 
  $(x); // unreachable
}
$(x); // unreachable
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ $continue___10__: /*11*/ {
    while (true) {
      /*14*/ if ($) {
        /*17*/ $(x___21__);
      } /*22*/ else {
        $(x___26__);
        x___30__ = 2;
        break $continue___32__;
      }
    }
    $(x___36__);
  }
}
$(x___40__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 21,26,36    | none           | 30
  - r @21      | 4,30
  - r @26      | 4,30
  - w @30      | ########## | 21,26,36    | 4,30           | 30
  - r @36      | 4,30
  - r @40      | none (unreachable?)
