# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Assignment > Arr > Obj > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{}] = 'abc');
$('bad');
`````


## Settled


`````js filename=intro
$(`bad`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`bad`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "bad" );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
