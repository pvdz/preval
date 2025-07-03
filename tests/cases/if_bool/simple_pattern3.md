# Preval test case

# simple_pattern3.md

> If bool > Simple pattern3
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(`a`);
const tmpBinLhs /*:unknown*/ = $(`a`);
let redundantAlias /*:boolean*/ /*ternaryConst*/ = true;
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
} else {
  redundantAlias = false;
}
const z /*:array*/ = [10, 20, 30];
if (redundantAlias) {
  const arrPatternSplat /*:array*/ = [...z];
  const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
  const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
  $(1, tmpClusterSSA_x, tmpClusterSSA_y, z);
} else {
  $(1, 1, 2, z);
}
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(`a`);
const tmpBinLhs /*:unknown*/ = $(`a`);
const tmpIfTest /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
const z /*:array*/ /*truthy*/ = [10, 20, 30];
if (tmpIfTest) {
  const arrPatternSplat /*:array*/ /*truthy*/ = [...z];
  const tmpClusterSSA_x /*:unknown*/ = arrPatternSplat[0];
  const tmpClusterSSA_y /*:unknown*/ = arrPatternSplat[1];
  $(1, tmpClusterSSA_x, tmpClusterSSA_y, z);
} else {
  $(1, 1, 2, z);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(`a`);
const tmpIfTest = $(`a`) === tmpSwitchValue;
const z = [10, 20, 30];
if (tmpIfTest) {
  const arrPatternSplat = [...z];
  $(1, arrPatternSplat[0], arrPatternSplat[1], z);
} else {
  $(1, 1, 2, z);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
const c = b === a;
const d = [ 10, 20, 30 ];
if (c) {
  const e = [ ...d ];
  const f = e[ 0 ];
  const g = e[ 1 ];
  $( 1, f, g, d );
}
else {
  $( 1, 1, 2, d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpSwitchValue = $(`a`);
const tmpBinLhs = $(`a`);
let redundantAlias = true;
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
} else {
  redundantAlias = false;
}
const z = [10, 20, 30];
if (redundantAlias) {
  const arrPatternSplat = [...z];
  const tmpClusterSSA_x = arrPatternSplat[0];
  const tmpClusterSSA_y = arrPatternSplat[1];
  $(1, tmpClusterSSA_x, tmpClusterSSA_y, z);
} else {
  $(1, 1, 2, z);
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) type trackeed tricks can possibly support static $boolean_constructor
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 10, 20, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
