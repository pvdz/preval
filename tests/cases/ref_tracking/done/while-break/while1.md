# Preval test case

# while1.md

> Ref tracking > Done > While-break > While1
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
    x = 2;
    continue;
  } else {
  }
}
$(x); // unreachable, without DCE it'll be 1,2
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
        /*21*/ x___25__ = 2;
        break $continue___27__;
      } /*28*/ else {
      }
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
  - w @4       | ########## | 18,34       | none           | 25
  - r @18      | 4,25
  - w @25      | ########## | 18,34       | 4,25           | 25
  - r @34      | 4,25
