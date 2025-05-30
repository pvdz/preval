# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Stmt-func-top > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3, d = 4;
  let a = b = $(c).y = $(d);
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpNestedAssignObj /*:unknown*/ = $(3);
const tmpNestedPropAssignRhs /*:unknown*/ = $(4);
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, tmpNestedPropAssignRhs, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignObj = $(3);
const tmpNestedPropAssignRhs = $(4);
tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs, tmpNestedPropAssignRhs, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
const b = $( 4 );
a.y = b;
$( b, b, 3 );
$( undefined );
`````


## Todos triggered


None


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
