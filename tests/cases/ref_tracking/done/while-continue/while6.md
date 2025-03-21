# Preval test case

# while6.md

> Ref tracking > Done > While-continue > While6
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x);
  x = 2;
  if ($) {
    continue;
  } else {
  }
}
$(x);
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $continue___13__: /*14*/ {
      $(x___18__);
      x___22__ = 2;
      if ($) {
        /*25*/ break $continue___27__;
      } /*28*/ else {
      }
    }
  } /*29*/ else {
    break;
  }
}
$(x___34__);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,34       | none           | 22
  - r @18      | 4,22
  - w @22      | ########## | 18,34       | 4,22           | 22
  - r @34      | 4,22
