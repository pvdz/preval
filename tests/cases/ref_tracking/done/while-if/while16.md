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
    } /*25*/ else {
    }
    $(x___29__);
    x___33__ = 2;
  } /*34*/ else {
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 29          | none           | 24,33
  - w @24      | ########## | 29          | 4,33           | 33
  - r @29      | 4,24,33
  - w @33      | ########## | 29          | 4,24,33        | 24,33

tmpIfTest:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
