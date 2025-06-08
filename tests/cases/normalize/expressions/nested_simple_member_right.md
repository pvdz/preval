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
const c /*:object*/ /*truthy*/ = {};
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
a = 10;
b = 20;
c = {};
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.x;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
$(a);
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
