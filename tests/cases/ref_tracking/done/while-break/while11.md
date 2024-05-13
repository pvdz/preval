# Preval test case

# while11.md

> Ref tracking > Done > While-break > While11
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  if ($(false)) {
    x = 2
    break;
  } else {
    $(x);
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
      /*20*/ x___24__ = 2;
      break;
    } /*26*/ else {
      $(x___30__);
      $(x___34__);
    }
  } /*35*/ else {
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 30,34       | none           | 24
  - w @24      | ########## | not read    | 4              | none
  - r @30      | 4
  - r @34      | 4

tmpIfTest:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
