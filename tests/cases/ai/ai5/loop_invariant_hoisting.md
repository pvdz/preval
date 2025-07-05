# Preval test case

# loop_invariant_hoisting.md

> Ai > Ai5 > Loop invariant hoisting
>
> Test hoisting of pure loop-invariant expressions

## Input

`````js filename=intro
const a = $([1, 2, 3]);
const b = $([4, 5, 6]);
let y;
while (a.length < 10) {
    y = Math.max(a.length, b.length) + 1;
    a.push(1);
}
$(y);
// Expected output:
// const a = $([1, 2, 3]);
// const b = $([4, 5, 6]);
// const tmp = Math.max(a.length, b.length) + 1;
// let y;
// while (a.length < 10) {
//     y = tmp;
//     a.push(1);
// }
// $(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2, 3];
const a /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [4, 5, 6];
const b /*:unknown*/ = $(tmpCalleeParam$1);
const tmpBinLhs /*:unknown*/ = a.length;
const tmpIfTest /*:boolean*/ = tmpBinLhs < 10;
if (tmpIfTest) {
  const tmpMCP /*:unknown*/ = a.length;
  const tmpMCP$1 /*:unknown*/ = b.length;
  const tmpBinLhs$1 /*:number*/ = $Math_max(tmpMCP, tmpMCP$1);
  let tmpClusterSSA_y /*:number*/ = tmpBinLhs$1 + 1;
  const tmpMCF$1 /*:unknown*/ = a.push;
  $dotCall(tmpMCF$1, a, `push`, 1);
  while ($LOOP_UNROLLS_LEFT_10) {
    const tmpBinLhs$2 /*:unknown*/ = a.length;
    const tmpIfTest$1 /*:boolean*/ = tmpBinLhs$2 < 10;
    if (tmpIfTest$1) {
      const tmpMCP$2 /*:unknown*/ = a.length;
      const tmpMCP$4 /*:unknown*/ = b.length;
      const tmpBinLhs$4 /*:number*/ = $Math_max(tmpMCP$2, tmpMCP$4);
      tmpClusterSSA_y = tmpBinLhs$4 + 1;
      const tmpMCF$2 /*:unknown*/ = a.push;
      $dotCall(tmpMCF$2, a, `push`, 1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_y);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $([1, 2, 3]);
const b = $([4, 5, 6]);
if (a.length < 10) {
  const tmpMCP = a.length;
  let tmpClusterSSA_y = $Math_max(tmpMCP, b.length) + 1;
  a.push(1);
  while (true) {
    if (a.length < 10) {
      const tmpMCP$2 = a.length;
      tmpClusterSSA_y = $Math_max(tmpMCP$2, b.length) + 1;
      a.push(1);
    } else {
      break;
    }
  }
  $(tmpClusterSSA_y);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = $( a );
const c = [ 4, 5, 6 ];
const d = $( c );
const e = b.length;
const f = e < 10;
if (f) {
  const g = b.length;
  const h = d.length;
  const i = $Math_max( g, h );
  let j = i + 1;
  const k = b.push;
  $dotCall( k, b, "push", 1 );
  while ($LOOP_UNROLLS_LEFT_10) {
    const l = b.length;
    const m = l < 10;
    if (m) {
      const n = b.length;
      const o = d.length;
      const p = $Math_max( n, o );
      j = p + 1;
      const q = b.push;
      $dotCall( q, b, "push", 1 );
    }
    else {
      break;
    }
  }
  $( j );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = [1, 2, 3];
const a = $(tmpCalleeParam);
let tmpCalleeParam$1 = [4, 5, 6];
const b = $(tmpCalleeParam$1);
let y = undefined;
while (true) {
  const tmpBinLhs = a.length;
  const tmpIfTest = tmpBinLhs < 10;
  if (tmpIfTest) {
    const tmpMCF = $Math_max;
    const tmpMCP = a.length;
    const tmpMCP$1 = b.length;
    const tmpBinLhs$1 = $dotCall(tmpMCF, Math, `max`, tmpMCP, tmpMCP$1);
    y = tmpBinLhs$1 + 1;
    const tmpMCF$1 = a.push;
    $dotCall(tmpMCF$1, a, `push`, 1);
  } else {
    break;
  }
}
$(y);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) array reads var statement with init CallExpression
- (todo) regular property access of an ident feels tricky;
- (todo) type trackeed tricks can possibly support static $Math_max


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [4, 5, 6]
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
