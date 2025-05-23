# Preval test case

# from_implicit.md

> Const aliasing > From implicit

## Options

- globals: unknown

## Input

`````js filename=intro
const tmp = unknown;
const x = tmp;
const y = tmp;
$(x, y);
`````


## Settled


`````js filename=intro
$(unknown, unknown);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(unknown, unknown);
`````


## PST Settled
With rename=true

`````js filename=intro
$( unknown, unknown );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmp = unknown;
const x = tmp;
const y = tmp;
$(x, tmp);
`````


## Todos triggered


None


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
