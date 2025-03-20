# Preval test case

# while16.md

> Ref tracking > Done > While-if > While16
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 0;
while ($) {
  if ($(true)) {
    x = 1;
  }
  $(x);
  x = 2;
}
`````


## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 0;
while (true) {
  /*8*/ if ($) {
    /*11*/ const tmpIfTest___14__ = $(true);
    if (tmpIfTest___19__) {
      /*20*/ x___24__ = 1;
      $(x___28__);
    } /*29*/ else {
      $(x___33__);
    }
    x___37__ = 2;
  } /*38*/ else {
    break;
  }
}
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 33          | none           | 24,37
  - w @24      | ########## | 28          | 4,37           | 37
  - r @28      | 24
  - r @33      | 4,37
  - w @37      | ########## | 33          | 4,24,37        | 24,37

tmpIfTest:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
