# Preval test case

# var_global_block.md

> Normalize > Hoisting > Base > Var global block
>
> Hosting in a block should end up in the parent

Should not hoist this because it's an anonymous default export.

There's no point in hoisting it since you can't refer to this function.

## Input

`````js filename=intro
$(x);
{
  var x = 10;
}
$(x);
`````


## Settled


`````js filename=intro
$(undefined);
$(10);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(10);
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
$(undefined);
x = 10;
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
