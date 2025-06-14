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
let /*___4__*/ x = 0;
while (true) {
  /*8~39*/ if ($) {
    /*11~37*/ const /*___14__*/ tmpIfTest = $(true);
    if (/*___19__*/ tmpIfTest) {
      /*20~28*/ /*___24__*/ x = 1;
      $(/*___28__*/ x);
    } /*29~33*/ else {
      $(/*___33__*/ x);
    }
    /*___37__*/ x = 2;
  } /*38~39*/ else {
    break;
  }
}
`````


## Todos triggered


None


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
