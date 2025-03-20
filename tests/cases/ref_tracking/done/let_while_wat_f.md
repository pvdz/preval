# Preval test case

# let_while_wat_f.md

> Ref tracking > Done > Let while wat f
>
> Some kind of regression. At the time of writing, the final x was marked as only able
> to reach the initial write. It should be conservative and say both.

## Options

- refTest

## Input

`````js filename=intro
let y = $(1);
let x = 0;
while (true) {
  if (x) { // x=0 1
    x = $(1);
  } else {
    break;
  }
}
$(x); // x=0 1 (ref tracking does not track values so it should consider if(x) reachable)
`````


## Output

(Annotated with pids)

`````filename=intro
let y___4__ = $(1);
let x___10__ = 0;
while (true) {
  /*14*/ if (x___16__) {
    /*17*/ x___23__ = $(1);
  } /*24*/ else {
    break;
  }
}
$(x___29__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
y:
  - w @4       | ########## | not read    | none           | none

x:
  - w @10      | ########## | 16,29       | none           | 23
  - r @16      | 10,23
  - w @23      | ########## | 16,29       | 10,23          | 23
  - r @29      | 10,23
