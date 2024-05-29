# Preval test case

# while9.md

> Ref tracking > Done > While-break > While9
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  $(x);
  if ($) {
    x = 2;
    break;
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
    /*11*/ $(x___15__);
    if ($) {
      /*18*/ x___22__ = 2;
      break;
    } /*24*/ else {
    }
  } /*25*/ else {
    break;
  }
}
$(x___30__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,30       | none           | 22
  - r @15      | 4
  - w @22      | ########## | 30          | 4              | none
  - r @30      | 4,22
