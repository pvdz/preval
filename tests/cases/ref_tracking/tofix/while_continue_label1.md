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
let /*___4__*/ x = 1;
while (true) {
  /*8~29*/ /*___10__*/ nestedLoop: /*11~29*/ {
    if ($) {
      /*14~18*/ $(/*___18__*/ x);
    } /*19~29*/ else {
      $(/*___23__*/ x);
      /*___27__*/ x = 2;
      break /*___29__*/ nestedLoop;
    }
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23       | none           | 27
  - r @18      | 4,27
  - r @23      | 4,27
  - w @27      | ########## | 18,23       | 4,27           | 27
