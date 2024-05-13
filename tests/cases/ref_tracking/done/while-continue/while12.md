# Preval test case

# while12.md

> Ref tracking > Done > While-continue > While12
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  if ($(false)) {
    x = 3;
    continue;
  } else {
  }
  $(x);
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ const tmpIfTest___14__ = $(false);
    if (tmpIfTest___19__) {
      /*20*/ x___24__ = 3;
      continue;
    } /*26*/ else {
      $(x___30__);
    }
  } /*31*/ else {
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 30          | none           | 24
  - w @24      | ########## | 30          | 4,24           | 24
  - r @30      | 4,24

tmpIfTest:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
