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
  /*8*/ nestedLoop___10__: /*11*/ {
    if ($) {
      /*14*/ $(x___18__);
    } /*19*/ else {
      $(x___23__);
      x___27__ = 2;
      break nestedLoop___29__;
    }
  }
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23       | none           | 27
  - r @18      | 4,27
  - r @23      | 4,27
  - w @27      | ########## | 18,23       | 4,27           | 27
