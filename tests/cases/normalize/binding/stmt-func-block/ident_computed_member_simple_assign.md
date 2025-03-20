# Preval test case

# ident_computed_member_simple_assign.md

> Normalize > Binding > Stmt-func-block > Ident computed member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= b[$('x')] = $(c)[$('y')] = $(d);
  $(a, b, c);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const varInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
  const varInitAssignLhsComputedProp$1 /*:unknown*/ = $(`y`);
  const varInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const b /*:object*/ = { x: 2 };
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1, b, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const varInitAssignLhsComputedProp = $(`x`);
  const varInitAssignLhsComputedObj$1 = $(3);
  const varInitAssignLhsComputedProp$1 = $(`y`);
  const varInitAssignLhsComputedRhs$1 = $(4);
  varInitAssignLhsComputedObj$1[varInitAssignLhsComputedProp$1] = varInitAssignLhsComputedRhs$1;
  const b = { x: 2 };
  b[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs$1;
  $(varInitAssignLhsComputedRhs$1, b, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( "x" );
  const c = $( 3 );
  const d = $( "y" );
  const e = $( 4 );
  c[d] = e;
  const f = { x: 2 };
  f[b] = e;
  $( e, f, 3 );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'x'
 - 3: 3
 - 4: 'y'
 - 5: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
