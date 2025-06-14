# Preval test case

# while20.md

> Ref tracking > Done > While-break > While20
>
>

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if ($) {
    if ($1) {
      $(x); // x=1 3
      x = 5;
      break;
    } else {
    }
    x = 3;
  } else {
    break;
  }
}
$(x); // x=5
`````


## Output

(Annotated with pids)

`````filename=intro
let /*___4__*/ x = 1;
while (/*___7__*/ $LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  /*8~30*/ if ($) {
    /*11~28*/ if ($1) {
      /*14~23*/ $(/*___18__*/ x);
      /*___22__*/ x = 5;
      break;
    } /*24~28*/ else {
      /*___28__*/ x = 3;
    }
  } /*29~30*/ else {
    break;
  }
}
$(/*___34__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,34       | none           | 22,28
  - r @18      | 4,28
  - w @22      | ########## | 34          | 4,28           | none
  - w @28      | ########## | 18,34       | 4,28           | 22,28
  - r @34      | 4,22,28
