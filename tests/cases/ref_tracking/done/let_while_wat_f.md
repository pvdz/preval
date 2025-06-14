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
let /*___5__*/ y = $(1);
let /*___10__*/ x = 0;
while (true) {
  /*14~25*/ if (/*___16__*/ x) {
    /*17~23*/ /*___23__*/ x = $(1);
  } /*24~25*/ else {
    break;
  }
}
$(/*___29__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
y:
  - w @5       | ########## | not read    | none           | none

x:
  - w @10      | ########## | 16,29       | none           | 23
  - r @16      | 10,23
  - w @23      | ########## | 16,29       | 10,23          | 23
  - r @29      | 10,23
