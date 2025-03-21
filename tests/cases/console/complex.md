# Preval test case

# complex.md

> Console > Complex
>
>

## Input

`````js filename=intro
console.log(['console tet case']);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`console tet case`];
console.log(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
console.log([`console tet case`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "console tet case" ];
console.log( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
