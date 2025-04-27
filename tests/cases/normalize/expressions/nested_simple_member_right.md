# Preval test case

# nested_simple_member_right.md

> Normalize > Expressions > Nested simple member right
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = 10, b = 20, c = {};
$(a = b = $(c).x);
`````


## Settled


`````js filename=intro
const c /*:object*/ = {};
const tmpCompObj /*:unknown*/ = $(c);
const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj.x;
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({}).x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( a );
const c = b.x;
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: {}
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
