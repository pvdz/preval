# Preval test case

# implicit_first.md

> Normalize > Identifier > Explicit shadow implicit > Implicit first
>
> Explicit binding that has the same name as an implicit global should be fine

## Input

`````js filename=intro
$(n);
{
  let n = $(10);
  $(n);
}
`````


## Settled


`````js filename=intro
$(n);
const n$1 /*:unknown*/ = $(10);
$(n$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(n);
$($(10));
`````


## PST Settled
With rename=true

`````js filename=intro
$( n );
const a = $( 10 );
$( a );
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

n


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
