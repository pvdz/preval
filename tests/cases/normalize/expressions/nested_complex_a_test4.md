# Preval test case

# nested_complex_a_test4.md

> Normalize > Expressions > Nested complex a test4
>
> Nested assignments should be split up

## Input

`````js filename=intro
let a = $([]), b;
//$($(a).length);
$($(a).length = b);
//$(a).length = b;
//$($(a).length = b = c);
//$($(a).length);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [];
const a /*:unknown*/ = $(tmpCalleeParam);
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(a);
tmpInitAssignLhsComputedObj.length = undefined;
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedObj = $($([]));
tmpInitAssignLhsComputedObj.length = undefined;
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $( a );
const c = $( b );
c.length = undefined;
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - 2: []
 - eval returned: ('<crash[ Invalid array length ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
