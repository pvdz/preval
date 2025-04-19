# Preval test case

# ident_member_complex_simple.md

> Normalize > Binding > Stmt-global-block > Ident member complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3;
  let a = $(b).x = c;
  $(a, b, c);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const b /*:object*/ = { x: 2 };
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  tmpInitAssignLhsComputedObj.x = 3;
  $(3, b, 3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const b = { x: 2 };
  const tmpInitAssignLhsComputedObj = $(b);
  tmpInitAssignLhsComputedObj.x = 3;
  $(3, b, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = { x: 2 };
  const c = $( b );
  c.x = 3;
  $( 3, b, 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: { x: '2' }
 - 3: 3, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
