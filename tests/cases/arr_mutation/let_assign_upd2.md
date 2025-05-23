# Preval test case

# let_assign_upd2.md

> Arr mutation > Let assign upd2
>
> This was a regression that led to invalid output

## Input

`````js filename=intro
let a = [0];
const b = a;
const c = a[0];
const d = c + 1;
b[0] = d;
$(a);
const e = a[0];
const f = e < 10;
if (f) {
  $(a,b,c,d,e,f)
} else {
}
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1];
$(a);
const e /*:primitive*/ = a[0];
const f /*:boolean*/ = e < 10;
if (f) {
  $(a, a, 0, 1, e, true);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1];
$(a);
const e = a[0];
if (e < 10) {
  $(a, a, 0, 1, e, true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1 ];
$( a );
const b = a[ 0 ];
const c = b < 10;
if (c) {
  $( a, a, 0, 1, b, true );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = [0];
const b = a;
const c = a[0];
const d = c + 1;
b[0] = d;
$(a);
const e = a[0];
const f = e < 10;
if (f) {
  $(a, b, c, d, e, f);
} else {
}
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1]
 - 2: [1], [1], 0, 1, 1, true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
