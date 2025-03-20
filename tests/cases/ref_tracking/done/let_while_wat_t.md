# Preval test case

# let_while_wat_t.md

> Ref tracking > Done > Let while wat t
>
> Some kind of regression. At the time of writing, the final x was marked as only able
> to reach the initial write, when in fact it can only reach the second write, even
> though preval won't be able to infer that (because our ref tracking uses no type
> information). But it should be conservative and say both.

## Options

- refTest

## Input

`````js filename=intro
let y = $();  // Must exist for the bug to appear. Does not need to be referenced.
let x = 1;    // First write to x
while (true) {
  if (x) {    // x=0 1. Always visited at least once because x starts as true.
    x = $(0); // Final read of x can only reach this write. But at least "also" reach this one.
  } else {
    break;
  }
}
$(x);         // x: Can only reach the last write, but preval should detect at least both writes
`````


## Output

(Annotated with pids)

`````filename=intro
let y___4__ = $();
let x___9__ = 1;
while (true) {
  /*13*/ if (x___15__) {
    /*16*/ x___22__ = $(0);
  } /*23*/ else {
    break;
  }
}
$(x___28__);
`````


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
y:
  - w @4       | ########## | not read    | none           | none

x:
  - w @9       | ########## | 15,28       | none           | 22
  - r @15      | 9,22
  - w @22      | ########## | 15,28       | 9,22           | 22
  - r @28      | 9,22
