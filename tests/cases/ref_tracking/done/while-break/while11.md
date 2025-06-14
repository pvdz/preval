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
let /*___4__*/ x = 1;
while (true) {
  /*8~36*/ if ($) {
    /*11~34*/ const /*___14__*/ tmpIfTest = $(false);
    if (/*___19__*/ tmpIfTest) {
      /*20~25*/ /*___24__*/ x = 2;
      break;
    } /*26~34*/ else {
      $(/*___30__*/ x);
      $(/*___34__*/ x);
    }
  } /*35~36*/ else {
    break;
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
