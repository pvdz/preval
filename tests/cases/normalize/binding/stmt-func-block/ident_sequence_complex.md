# Preval test case

# ident_sequence_complex.md

> Normalize > Binding > Stmt-func-block > Ident sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = 2, c = 3;
  let a= ($(b), $(c));
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
  const a /*:unknown*/ = $(3);
  $(a, 2, 3);
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
  $($(3), 2, 3);
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
  $( b, 2, 3 );
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
 - 2: 2
 - 3: 3
 - 4: 3, 2, 3
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
