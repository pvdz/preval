# Preval test case

# spread.md

> If update call > Spread
>
> If a variable is conditionally set and then used in a call after the `if`/`else`, we can hoist the call inside those branches.

## Input

`````js filename=intro
const a = $([100, 200])
let x = undefined;
if ($(true)) {
  const r = [1, 2];
  x = r;
} else {
  const r = [3, 4];
  x = r;
}
$( ...x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [100, 200];
$(tmpCalleeParam);
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(1, 2);
} else {
  $(3, 4);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([100, 200]);
if ($(true)) {
  $(1, 2);
} else {
  $(3, 4);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100, 200 ];
$( a );
const b = $( true );
if (b) {
  $( 1, 2 );
}
else {
  $( 3, 4 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [100, 200];
const a = $(tmpCalleeParam);
let x = undefined;
const tmpIfTest = $(true);
if (tmpIfTest) {
  const r = [1, 2];
  x = r;
} else {
  const r$1 = [3, 4];
  x = r$1;
}
$(...x);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [100, 200]
 - 2: true
 - 3: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
