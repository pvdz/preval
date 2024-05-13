# Preval test case

# while14.md

> Ref tracking > Done > While-continue > While14
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
    continue;
  } else {
  }
  if ($) {
    $(x);
    x = 6;
    break;
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
      continue;
    } /*26*/ else {
      if ($) {
        /*29*/ $(x___33__);
        x___37__ = 6;
        break;
      } /*39*/ else {
        x___43__ = 3;
      }
    }
  } /*44*/ else {
    break;
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 24,33       | none           | 37,43
  - r @24      | 4,43
  - r @33      | 4,43
  - w @37      | ########## | not read    | 4,43           | none
  - w @43      | ########## | 24,33       | 4,43           | 37,43

tmpIfTest:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
