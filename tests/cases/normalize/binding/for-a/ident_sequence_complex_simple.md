# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > For-a > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = ($(b), $(c)).x = c;false;) $(a, b, c);
`````


## Settled


`````js filename=intro
$(2);
const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
tmpInitAssignLhsComputedObj.x = 3;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
const tmpInitAssignLhsComputedObj = $(3);
tmpInitAssignLhsComputedObj.x = 3;
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
const a = $( 3 );
a.x = 3;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
