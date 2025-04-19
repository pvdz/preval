# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Stmt-global-block > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3, d = 4;
  let a = $(b).x = $(c).y = $(d);
  $(a, b, c, d);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const b /*:object*/ = { x: 2 };
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(b);
  const tmpInitAssignLhsComputedObj$1 /*:unknown*/ = $(3);
  const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
  tmpInitAssignLhsComputedObj$1.y = tmpInitAssignLhsComputedRhs$1;
  tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs$1;
  $(tmpInitAssignLhsComputedRhs$1, b, 3, 4);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const b = { x: 2 };
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedObj$1 = $(3);
  const tmpInitAssignLhsComputedRhs$1 = $(4);
  tmpInitAssignLhsComputedObj$1.y = tmpInitAssignLhsComputedRhs$1;
  tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs$1;
  $(tmpInitAssignLhsComputedRhs$1, b, 3, 4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = { x: 2 };
  const c = $( b );
  const d = $( 3 );
  const e = $( 4 );
  d.y = e;
  c.x = e;
  $( e, b, 3, 4 );
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
 - 3: 3
 - 4: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
