# Preval test case

# ident_member_complex_assign.md

> Normalize > Binding > Stmt-func-block > Ident member complex assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= $(b).x = $(c).y = $(d);
  $(a, b, c, d);
}
}
$(f());
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
  const tmpInitAssignLhsComputedObj = $(b);
  const tmpInitAssignLhsComputedObj$1 = $(3);
  const tmpInitAssignLhsComputedRhs$1 = $(4);
  tmpInitAssignLhsComputedObj$1.y = tmpInitAssignLhsComputedRhs$1;
  tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs$1;
  $(tmpInitAssignLhsComputedRhs$1, b, 3, 4);
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
  const d = $( 3 );
  const e = $( 4 );
  d.y = e;
  c.x = e;
  $( e, b, 3, 4 );
  $( undefined );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = { x: 2 };
    let c = 3;
    let d = 4;
    const tmpInitAssignLhsComputedObj = $(b);
    const tmpInitAssignLhsComputedObj$1 = $(c);
    const tmpInitAssignLhsComputedRhs$1 = $(d);
    tmpInitAssignLhsComputedObj$1.y = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
    let a = tmpInitAssignLhsComputedRhs;
    $(tmpInitAssignLhsComputedRhs, b, c, d);
    return undefined;
  } else {
    return undefined;
  }
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
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
