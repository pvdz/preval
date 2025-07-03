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
const a /*:array*/ /*truthy*/ = [];
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(a);
tmpInitAssignLhsComputedObj.length = 30;
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $([]);
tmpInitAssignLhsComputedObj.length = 30;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = [];
b = 20;
c = 30;
const tmpInitAssignLhsComputedObj = $(a);
b = c;
const tmpInitAssignLhsComputedRhs = b;
tmpInitAssignLhsComputedObj.length = tmpInitAssignLhsComputedRhs;
let tmpCalleeParam = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


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
