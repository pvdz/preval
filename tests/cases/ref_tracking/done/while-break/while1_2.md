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
    /*11*/ $(x___15__);
    if ($) {
      /*18*/ if ($1) {
        /*21*/ x___25__ = 2;
      } /*26*/ else {
      }
      continue;
    } /*28*/ else {
    }
  } /*29*/ else {
    break;
  }
}
$(x___34__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,34       | none           | 25
  - r @15      | 4,25
  - w @25      | ########## | 15,34       | 4,25           | 25
  - r @34      | 4,25
