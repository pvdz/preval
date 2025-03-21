# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Stmt-global-block > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3, d = 4;
  let a = b = $(c).y = $(d);
  $(a, b, c);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpNestedAssignObj /*:unknown*/ = $(3);
  const tmpNestedAssignPropRhs /*:unknown*/ = $(4);
  tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, tmpNestedAssignPropRhs, 3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const tmpNestedAssignObj = $(3);
  const tmpNestedAssignPropRhs = $(4);
  tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, tmpNestedAssignPropRhs, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 3 );
  const c = $( 4 );
  b.y = c;
  $( c, c, 3 );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
