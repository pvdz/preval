# Preval test case

# ident_sequence_complex_complex.md

> Normalize > Binding > Stmt-func-block > Ident sequence complex complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = 2, c = 3;
  let a= ($(b), $(c)).x = $(c);
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
  const tmpInitAssignLhsComputedRhs /*:unknown*/ = $(3);
  tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs, 2, 3);
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
  const tmpInitAssignLhsComputedRhs = $(3);
  tmpInitAssignLhsComputedObj.x = tmpInitAssignLhsComputedRhs;
  $(tmpInitAssignLhsComputedRhs, 2, 3);
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
  const c = $( 3 );
  b.x = c;
  $( c, 2, 3 );
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
 - 2: 2
 - 3: 3
 - 4: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
