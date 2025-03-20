# Preval test case

# func_global_block.md

> Normalize > Hoisting > Base > Func global block
>
> Function declarations in a block are not hoisted

## Input

`````js filename=intro
{
  let x = 100;
  function f() {
    return x;
  }
  $(f());
}
`````


## Settled


`````js filename=intro
$(100);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
