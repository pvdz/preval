# Preval test case

# member.md

> If test merging > Member
>
> There was a bug in the key check boolean that would fail this.

## Input

`````js filename=intro
const obj = $({ a: 'a', b: 'b' });
if ($(false)) {
  const FROM_THEN = obj.a;
  $(FROM_THEN, 'must be then');
} else {
  const FROM_ELSE = obj.b;
  $(FROM_ELSE, 'must be else');
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: `a`, b: `b` };
const obj /*:unknown*/ = $(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  const FROM_THEN /*:unknown*/ = obj.a;
  $(FROM_THEN, `must be then`);
} else {
  const FROM_ELSE /*:unknown*/ = obj.b;
  $(FROM_ELSE, `must be else`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $({ a: `a`, b: `b` });
if ($(false)) {
  $(obj.a, `must be then`);
} else {
  $(obj.b, `must be else`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: "a",
  b: "b",
};
const b = $( a );
const c = $( false );
if (c) {
  const d = b.a;
  $( d, "must be then" );
}
else {
  const e = b.b;
  $( e, "must be else" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: `a`, b: `b` };
const obj = $(tmpCalleeParam);
const tmpIfTest = $(false);
if (tmpIfTest) {
  const FROM_THEN = obj.a;
  $(FROM_THEN, `must be then`);
} else {
  const FROM_ELSE = obj.b;
  $(FROM_ELSE, `must be else`);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"a"', b: '"b"' }
 - 2: false
 - 3: 'b', 'must be else'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
