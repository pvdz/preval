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
/* stmt(3): */ let /*___4__*/ x = 0;
/* stmt(6): */ while (true) {
  /*8~39*/ /* stmt(9): */ if ($) {
    /*11~37*/ /* stmt(13): */ const /*___14__*/ tmpIfTest = $(true);
    /* stmt(18): */ if (/*___19__*/ tmpIfTest) {
      /*20~28*/ /* stmt(21): */ /*___24__*/ x = 1;
      /* stmt(25): */ $(/*___28__*/ x);
    } /*29~33*/ else {
      /* stmt(30): */ $(/*___33__*/ x);
    }
    /* stmt(34): */ /*___37__*/ x = 2;
  } /*38~39*/ else {
    /* stmt(39): */ break;
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
