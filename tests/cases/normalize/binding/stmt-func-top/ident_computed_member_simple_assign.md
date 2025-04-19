# Preval test case

# ident_computed_member_simple_assign.md

> Normalize > Binding > Stmt-func-top > Ident computed member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3, d = 4;
  let a = b[$('x')] = $(c)[$('y')] = $(d);
  $(a, b, c);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
const tmpInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
const b /*:object*/ = { x: 2 };
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
$(tmpInitAssignLhsComputedRhs$1, b, 3);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpInitAssignLhsComputedProp = $(`x`);
const tmpInitAssignLhsComputedObj$1 = $(3);
const tmpInitAssignLhsComputedProp$1 = $(`y`);
const tmpInitAssignLhsComputedRhs$1 = $(4);
tmpInitAssignLhsComputedObj$1[tmpInitAssignLhsComputedProp$1] = tmpInitAssignLhsComputedRhs$1;
const b = { x: 2 };
b[tmpInitAssignLhsComputedProp] = tmpInitAssignLhsComputedRhs$1;
$(tmpInitAssignLhsComputedRhs$1, b, 3);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x" );
const b = $( 3 );
const c = $( "y" );
const d = $( 4 );
b[c] = d;
const e = { x: 2 };
e[a] = d;
$( d, e, 3 );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x'
 - 2: 3
 - 3: 'y'
 - 4: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
