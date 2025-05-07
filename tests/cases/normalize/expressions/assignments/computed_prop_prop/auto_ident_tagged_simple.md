# Preval test case

# auto_ident_tagged_simple.md

> Normalize > Expressions > Assignments > Computed prop prop > Auto ident tagged simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = $`fo${1}o`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`fo`, `o`];
const a /*:unknown*/ = $(tmpCalleeParam, 1);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($([`fo`, `o`], 1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "fo", "o" ];
const b = $( a, 1 );
$( b );
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['fo', 'o'], 1
 - 2: ['fo', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
