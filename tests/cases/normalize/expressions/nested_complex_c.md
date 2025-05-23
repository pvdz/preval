# Preval test case

# nested_complex_c.md

> Normalize > Expressions > Nested complex c
>
> Nested assignments should be split up

## Input

`````js filename=intro
var a = 10, b = 20, c = [];
$(a = b = $(c).length);
`````


## Settled


`````js filename=intro
const c /*:array*/ = [];
const tmpCompObj /*:unknown*/ = $(c);
const tmpNestedComplexRhs /*:unknown*/ = tmpCompObj.length;
$(tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($([]).length);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = b.length;
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
c = [];
const tmpCompObj = $(c);
const tmpNestedComplexRhs = tmpCompObj.length;
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
let tmpCalleeParam = a;
$(a);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
