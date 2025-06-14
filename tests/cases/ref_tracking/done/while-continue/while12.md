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
  $(x); // x=1 3
}
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (true) {
  /*8~36*/ if ($) {
    /*11~34*/ /*___13__*/ $continue: /*14~34*/ {
      const /*___17__*/ tmpIfTest = $(false);
      if (/*___22__*/ tmpIfTest) {
        /*23~29*/ /*___27__*/ x = 3;
        break /*___29__*/ $continue;
      } /*30~34*/ else {
        $(/*___34__*/ x);
      }
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
  - w @4       | ########## | 34          | none           | 27
  - w @27      | ########## | 34          | 4,27           | 27
  - r @34      | 4,27

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17
