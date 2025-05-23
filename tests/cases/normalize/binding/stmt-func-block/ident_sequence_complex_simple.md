# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > Stmt-func-block > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = 2, c = 3;
  let a= ($(b), $(c)).x = c;
  $(a, b, c);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(2);
  const tmpInitAssignLhsComputedObj /*:unknown*/ = $(3);
  tmpInitAssignLhsComputedObj.x = 3;
  $(3, 2, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(2);
  const tmpInitAssignLhsComputedObj = $(3);
  tmpInitAssignLhsComputedObj.x = 3;
  $(3, 2, 3);
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
  $( 2 );
  const b = $( 3 );
  b.x = 3;
  $( 3, 2, 3 );
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
    let b = 2;
    let c = 3;
    $(b);
    const tmpInitAssignLhsComputedObj = $(c);
    const tmpInitAssignLhsComputedRhs = c;
    tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
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
 - 2: 2
 - 3: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
