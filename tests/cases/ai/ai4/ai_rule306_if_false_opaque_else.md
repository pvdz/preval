# Preval test case

# ai_rule306_if_false_opaque_else.md

> Ai > Ai4 > Ai rule306 if false opaque else
>
> Test: if(false) with opaque call in else block.

## Input

`````js filename=intro
// Expected: $('bar');
if (false) { 
  // This block should be removed
  $('dead_then'); 
} else { 
  $('bar'); 
}
`````


## Settled


`````js filename=intro
$(`bar`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`bar`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "bar" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`bar`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'bar'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
