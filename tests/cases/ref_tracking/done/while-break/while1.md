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
  $(x);
  if ($) {
    x = 2;
    continue;
  } else {
  }
}
$(x); // 1 or 2
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
      continue;
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
  - r @15      | 4,22
  - w @22      | ########## | 15          | 4,22           | 22
  - r @30      | 4
