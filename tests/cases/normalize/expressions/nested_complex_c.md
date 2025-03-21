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
const tmpClusterSSA_c /*:array*/ = [];
const tmpCompObj /*:unknown*/ = $(tmpClusterSSA_c);
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


## Todos triggered


None


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
