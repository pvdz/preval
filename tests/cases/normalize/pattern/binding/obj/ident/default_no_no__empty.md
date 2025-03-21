# Preval test case

# default_no_no__empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x } = 1;
$('bad');
`````


## Settled


`````js filename=intro
(1).x;
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
(1).x;
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
1.x;
$( "bad" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
