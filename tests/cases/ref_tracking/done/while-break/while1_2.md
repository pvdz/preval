# Preval test case

# while1_2.md

> Ref tracking > Done > While-break > While1 2
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x); // x=1 2
  if ($) {
    if ($1) {
      // Now this exitWrite should be amended in the parent
      x = 2;
    }
    continue;
  } else {
  }
}
$(x); // unreachable. if it was, then x=1 or 2.
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $continue___13__: /*14*/ {
      $(x___18__);
      if ($) {
        /*21*/ if ($1) {
          /*24*/ x___28__ = 2;
        } /*29*/ else {
        }
        break $continue___31__;
      } /*32*/ else {
      }
    }
  } /*33*/ else {
    break;
  }
}
$(x___38__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,38       | none           | 28
  - r @18      | 4,28
  - w @28      | ########## | 18,38       | 4,28           | 28
  - r @38      | 4,28
