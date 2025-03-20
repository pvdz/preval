# Preval test case

# ident_ident_assign.md

> Normalize > Binding > For-a > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
for (let a = b = $(c).y = $(d);false;) $(a, b, c);
`````


## Settled


`````js filename=intro
const tmpNestedAssignObj /*:unknown*/ = $(3);
const tmpNestedAssignPropRhs /*:unknown*/ = $(4);
tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObj = $(3);
tmpNestedAssignObj.y = $(4);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
