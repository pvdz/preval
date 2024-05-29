# Preval test case

# while3.md

> Ref tracking > Done > While-continue > While3
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
    continue;
  } else {
    x = 2;
  }
}
$(x); // unreachable (otherwise x=1 2)
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $(x___15__);
    if ($) {
      /*18*/ continue;
    } /*20*/ else {
      x___24__ = 2;
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
  - w @4       | ########## | 15,30       | none           | 24
  - r @15      | 4,24
  - w @24      | ########## | 15          | 4,24           | 24
  - r @30      | 4
