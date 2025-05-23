# Preval test case

# ident_member_sequence_simple.md

> Normalize > Binding > Stmt-global-block > Ident member sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
if ($(true)) {
  let b = {x: 2}, c = 3;
  let a = (b.x, c).foo;
  $(a, b, c);
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  const a /*:unknown*/ = $Number_prototype.foo;
  const b /*:object*/ = { x: 2 };
  $(a, b, 3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $($Number_prototype.foo, { x: 2 }, 3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $Number_prototype.foo;
  const c = { x: 2 };
  $( b, c, 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = { x: 2 };
  let c = 3;
  b.x;
  const tmpCompObj = c;
  let a = tmpCompObj.foo;
  $(a, b, c);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: undefined, { x: '2' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
