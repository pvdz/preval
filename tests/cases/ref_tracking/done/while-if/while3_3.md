# Preval test case

# while3_3.md

> Ref tracking > Done > While-if > While3 3
>
> if

When the break gets scheduled, the assignment isn't seen yet. But the break
could happen in the second loop, after which x is fully overwritten.
So when the end of the loop is connected to the start of the loop the 
overwrittens from the block with the break should be updated as well to
make it all work. If we don't then the last write can't see the x=2.

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($) {
    $(x);
  } else {
    break;
  }
  x = 2;
}
$(x); // 1 or 2
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
while (true) {
  /*8*/ if ($) {
    /*11*/ $(x___15__);
    x___19__ = 2;
  } /*20*/ else {
    break;
  }
}
$(x___25__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,25       | none           | 19
  - r @15      | 4,19
  - w @19      | ########## | 15,25       | 4,19           | 19
  - r @25      | 4,19
