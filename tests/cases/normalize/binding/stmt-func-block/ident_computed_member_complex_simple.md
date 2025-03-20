# Preval test case

# ident_computed_member_complex_simple.md

> Normalize > Binding > Stmt-func-block > Ident computed member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3;
  let a= $(b)[$('x')] = c;
  $(a, b, c);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const b /*:object*/ = { x: 2 };
  const varInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const varInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  $(3, b, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const b = { x: 2 };
  const varInitAssignLhsComputedObj = $(b);
  const varInitAssignLhsComputedProp = $(`x`);
  varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 3;
  $(3, b, 3);
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
  const b = { x: 2 };
  const c = $( b );
  const d = $( "x" );
  c[d] = 3;
  $( 3, b, 3 );
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
 - 2: { x: '2' }
 - 3: 'x'
 - 4: 3, { x: '3' }, 3
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
