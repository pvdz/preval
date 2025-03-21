# Preval test case

# while1_4.md

> Ref tracking > Done > While-break > While1 4
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  $(x); // x=1 2
  if ($) {
    if ($1) {
      // Now this exitWrite should be amended in the parent
      x = 2;
    }
    continue;
  } else {
  }
  if ($2) break;
}
$(x); // x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ $continue___10__: /*11*/ {
    $(x___15__);
    if ($) {
      /*18*/ if ($1) {
        /*21*/ x___25__ = 2;
      } /*26*/ else {
      }
      break $continue___28__;
    } /*29*/ else {
      if ($2) {
        /*32*/ break;
      } /*34*/ else {
      }
    }
  }
}
$(x___38__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,38       | none           | 25
  - r @15      | 4,25
  - w @25      | ########## | 15,38       | 4,25           | 25
  - r @38      | 4,25
