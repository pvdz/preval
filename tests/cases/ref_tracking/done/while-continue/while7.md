# Preval test case

# while7.md

> Ref tracking > Done > While-continue > While7
>
> if

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  if ($) {
    $(x); // x=1 2
    continue;
  } else {
    $(x); // x=1 2
    x = 2;
  }
}
$(x); // unreachable
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE___7__) {
  /*8*/ if ($) {
    /*11*/ $(x___15__);
    continue;
  } /*17*/ else {
    $(x___21__);
    x___25__ = 2;
  }
}
$(x___29__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,21       | none           | 25
  - r @15      | 4,25
  - r @21      | 4,25
  - w @25      | ########## | 15,21       | 4,25           | 25
  - r @29      | none (unreachable?)
