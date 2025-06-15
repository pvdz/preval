# Preval test case

# find_callback_not_function.md

> Array methods > Findlast > Ai > Find callback not function
>
> Test: Array.findLast throws TypeError when callback is not a function

## Input

`````js filename=intro
const arr = $([1, 2, 3]);
try {
  arr.findLast('not a function');
} catch (e) {
  $(e.name);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const arr /*:unknown*/ = $(tmpCalleeParam);
try {
  const tmpMCF /*:unknown*/ = arr.findLast;
  $dotCall(tmpMCF, arr, `findLast`, `not a function`);
} catch (e) {
  const tmpCalleeParam$1 /*:unknown*/ = e.name;
  $(tmpCalleeParam$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $([1, 2, 3]);
try {
  arr.findLast(`not a function`);
} catch (e) {
  $(e.name);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
try {
  const c = b.findLast;
  $dotCall( c, b, "findLast", "not a function" );
}
catch (d) {
  const e = d.name;
  $( e );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const arr = $(tmpCalleeParam);
try {
  const tmpMCF = arr.findLast;
  $dotCall(tmpMCF, arr, `findLast`, `not a function`);
} catch (e) {
  let tmpCalleeParam$1 = e.name;
  $(tmpCalleeParam$1);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? MemberExpression
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: 'TypeError'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
