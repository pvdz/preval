# Preval test case

# block.md

> Normalize > Dce > Break > Block
>
> Any statements that follow a return in the same parent should be eliminated.

## Input

`````js filename=intro
while ($(true)) {
  {
    break;
    $('fail');
  }
}
$('after');
`````


## Settled


`````js filename=intro
$(true);
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(true);
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( true );
$( "after" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
