# Preval test case

# implicit_second.md

> Normalize > Identifier > Explicit shadow implicit > Implicit second
>
> Explicit binding that has the same name as an implicit global should be fine

## Input

`````js filename=intro
{
  let n = $(10);
  $(n);
}
$(n);
`````


## Settled


`````js filename=intro
const n$1 /*:unknown*/ = $(10);
$(n$1);
$(n);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(10));
$(n);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
$( n );
`````


## Globals


BAD@! Found 1 implicit global bindings:

n


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
