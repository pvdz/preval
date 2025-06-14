# Preval test case

# nested_complex_a_test3.md

> Normalize > Expressions > Nested complex a test3
>
> Nested assignments should be split up

## Input

`````js filename=intro
let a = $([]), b;
//$($(a).length);
//$($(a).length = b);
//$(a).length = b;
//$($(a).length = b = c);
$($(a).length);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [];
const a /*:unknown*/ = $(tmpCalleeParam);
const tmpCompObj /*:unknown*/ = $(a);
const tmpCalleeParam$1 /*:unknown*/ = tmpCompObj.length;
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($($([])).length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $( b );
const d = c.length;
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [];
let a = $(tmpCalleeParam);
let b = undefined;
const tmpCompObj = $(a);
let tmpCalleeParam$1 = tmpCompObj.length;
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: []
 - 3: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
