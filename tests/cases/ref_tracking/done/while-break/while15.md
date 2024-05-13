# Preval test case

# while15.md

> Ref tracking > Done > While-break > While15
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($) {
  if ($(false)) {
    $(x);
    x = 5;
    break;
  } else {
    x = 4;
  }
  x = 3;
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
      /*20*/ $(x___24__);
      x___28__ = 5;
      break;
    } /*30*/ else {
      x___34__ = 4;
      x___38__ = 3;
    }
  } /*39*/ else {
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24          | none           | 28,34
  - r @24      | 4,38
  - w @28      | ########## | not read    | 4,38           | none
  - w @34      | ########## | not read    | 4,38           | 38
  - w @38      | ########## | 24          | 34             | 28,34

tmpIfTest:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
