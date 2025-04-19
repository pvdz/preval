# Preval test case

# ident_computed_member_simple_bin.md

> Normalize > Binding > Stmt-global-block > Ident computed member simple bin
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3, d = 4;
  let a = b[$('x')] = c + d;
  $(a, b, c);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpInitAssignLhsComputedProp /*:unknown*/ = $(`x`);
  const b /*:object*/ = { x: 2 };
  b[tmpInitAssignLhsComputedProp] = 7;
  $(7, b, 3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const tmpInitAssignLhsComputedProp = $(`x`);
  const b = { x: 2 };
  b[tmpInitAssignLhsComputedProp] = 7;
  $(7, b, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( "x" );
  const c = { x: 2 };
  c[b] = 7;
  $( 7, c, 3 );
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
 - 3: 7, { x: '7' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
