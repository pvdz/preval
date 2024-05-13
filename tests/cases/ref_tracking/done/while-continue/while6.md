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
    /*11*/ $(x___15__);
    x___19__ = 2;
    if ($) {
      /*22*/ continue;
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
  - w @4       | ########## | 15,30       | none           | 19
  - r @15      | 4,19
  - w @19      | ########## | 15,30       | 4,19           | 19
  - r @30      | 4,19
