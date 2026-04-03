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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~36*/ /* stmt(9): */ if ($) {
    /*11~34*/ /* stmt(13): */ const /*___14__*/ tmpIfTest = $(false);
    /* stmt(18): */ if (/*___19__*/ tmpIfTest) {
      /*20~25*/ /* stmt(21): */ /*___24__*/ x = 2;
      /* stmt(25): */ break;
    } /*26~34*/ else {
      /* stmt(27): */ $(/*___30__*/ x);
      /* stmt(31): */ $(/*___34__*/ x);
    }
  } /*35~36*/ else {
    /* stmt(36): */ break;
  }
}
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 30,34       | none           | 24
  - w @24      | ########## | not read    | 4              | none
  - r @30      | 4
  - r @34      | 4

tmpIfTest:
  - w @14      | ########## | 19          | none           | none
  - r @19      | 14
