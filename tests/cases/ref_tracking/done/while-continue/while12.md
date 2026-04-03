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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~36*/ /* stmt(9): */ if ($) {
    /*11~34*/ /* stmt(12): */ /*___13__*/ $continue: /*14~34*/ {
      /* stmt(16): */ const /*___17__*/ tmpIfTest = $(false);
      /* stmt(21): */ if (/*___22__*/ tmpIfTest) {
        /*23~29*/ /* stmt(24): */ /*___27__*/ x = 3;
        /* stmt(28): */ break /*___29__*/ $continue;
      } /*30~34*/ else {
        /* stmt(31): */ $(/*___34__*/ x);
      }
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
  - w @4       | ########## | 34          | none           | 27
  - w @27      | ########## | 34          | 4,27           | 27
  - r @34      | 4,27

tmpIfTest:
  - w @17      | ########## | 22          | none           | none
  - r @22      | 17
