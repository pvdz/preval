# Preval test case

# nested_simple_member_left.md

> Normalize > Expressions > Nested simple member left
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = {}, b = 20, c = 30;
$($(a).x = b = c);
`````


## Settled


`````js filename=intro
const a /*:object*/ = {};
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(a);
tmpInitAssignLhsComputedObj.x = 30;
$(30);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $({});
tmpInitAssignLhsComputedObj.x = 30;
$(30);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( a );
b.x = 30;
$( 30 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = {};
b = 20;
c = 30;
const tmpInitAssignLhsComputedObj = $(a);
b = c;
const tmpInitAssignLhsComputedRhs = b;
tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
let tmpCalleeParam = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
