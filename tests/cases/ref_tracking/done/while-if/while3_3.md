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
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~21*/ /* stmt(9): */ if ($) {
    /*11~19*/ /* stmt(12): */ $(/*___15__*/ x);
    /* stmt(16): */ /*___19__*/ x = 2;
  } /*20~21*/ else {
    /* stmt(21): */ break;
  }
}
/* stmt(22): */ $(/*___25__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 15,25       | none           | 19
  - r @15      | 4,19
  - w @19      | ########## | 15,25       | 4,19           | 19
  - r @25      | 4,19
