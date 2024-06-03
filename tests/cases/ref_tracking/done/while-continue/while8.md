# Preval test case

# while8.md

> Ref tracking > Done > While-continue > While8
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($) {
    $(x);
  } else {
    $(x);
    x = 2;
    continue;
  }
}
$(x); // unreachable
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ $continue___10__: /*11*/ {
    if ($) {
      /*14*/ $(x___18__);
    } /*19*/ else {
      $(x___23__);
      x___27__ = 2;
      break $continue___29__;
    }
  }
}
$(x___33__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,23       | none           | 27
  - r @18      | 4,27
  - r @23      | 4,27
  - w @27      | ########## | 18,23       | 4,27           | 27
  - r @33      | none (unreachable?)
