# Preval test case

# ident_member_sequence_simple.md

> Normalize > Binding > Stmt-func-block > Ident member sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = {x: 2}, c = 3;
  let a= (b.x, c).foo;
  $(a, b, c);
}
}
$(f());
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const a /*:unknown*/ = (3).foo;
  const b /*:object*/ = { x: 2 };
  $(a, b, 3);
  $(undefined);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $((3).foo, { x: 2 }, 3);
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
  const b = 3.foo;
  const c = { x: 2 };
  $( b, c, 3 );
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
 - 2: undefined, { x: '2' }, 3
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
