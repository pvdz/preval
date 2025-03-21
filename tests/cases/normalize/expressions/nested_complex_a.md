# Preval test case

# nested_complex_a.md

> Normalize > Expressions > Nested complex a
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = [], b = 20, c = 30;
$($(a).length = b = c);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_a /*:array*/ = [];
const varInitAssignLhsComputedObj /*:unknown*/ = $(tmpClusterSSA_a);
varInitAssignLhsComputedObj.length = 30;
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const varInitAssignLhsComputedObj = $([]);
varInitAssignLhsComputedObj.length = 30;
$(30);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
b.length = 30;
$( 30 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
