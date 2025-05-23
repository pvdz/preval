# Preval test case

# ident_member_simple_assign.md

> Normalize > Binding > Stmt-func-block > Ident member simple assign
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3, d = 4;
  let a= b.x = $(c).y = $(d);
  $(a, b, c);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
  const tmpInitAssignLhsComputedRhs$1 /*:unknown*/ = $(4);
  tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
  const b /*:object*/ = { x: tmpInitAssignLhsComputedRhs$1 };
  $(tmpInitAssignLhsComputedRhs$1, b, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  const tmpInitAssignLhsComputedObj = $(3);
  const tmpInitAssignLhsComputedRhs$1 = $(4);
  tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
  $(tmpInitAssignLhsComputedRhs$1, { x: tmpInitAssignLhsComputedRhs$1 }, 3);
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
  const b = $( 3 );
  const c = $( 4 );
  b.y = c;
  const d = { x: c };
  $( c, d, 3 );
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
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedRhs$1 = $(d);
    tmpInitAssignLhsComputedObj.y = tmpInitAssignLhsComputedRhs$1;
    const tmpInitAssignLhsComputedRhs = tmpInitAssignLhsComputedRhs$1;
    b.x = tmpInitAssignLhsComputedRhs;
    let a = tmpInitAssignLhsComputedRhs;
    $(tmpInitAssignLhsComputedRhs, b, c);
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
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
