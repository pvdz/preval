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
  /*8*/ $continue___10__: /*11*/ {
    if ($) {
      /*14*/ $(x___18__);
      break $continue___20__;
    } /*21*/ else {
      $(x___25__);
      x___29__ = 2;
    }
  }
}
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 18,25       | none           | 29
  - r @18      | 4,29
  - r @25      | 4,29
  - w @29      | ########## | 18,25       | 4,29           | 29
