# Preval test case

# ident_computed_member_simple_simple.md

> Normalize > Binding > Stmt-func-block > Ident computed member simple simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3;
  let a= b[$('x')] = c;
  $(a, b, c);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const b /*:object*/ = { x: 2 };
  b[tmpInitAssignLhsComputedProp] = 3;
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
  const tmpInitAssignLhsComputedProp = $(`x`);
  const b = { x: 2 };
  b[tmpInitAssignLhsComputedProp] = 3;
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
  const b = $( "x" );
  const c = { x: 2 };
  c[b] = 3;
  $( 3, c, 3 );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 'x'
 - 3: 3, { x: '3' }, 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
