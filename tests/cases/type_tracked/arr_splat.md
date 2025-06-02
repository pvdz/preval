# Preval test case

# arr_splat.md

> Tofix > arr splat

The array splat expand case can be simplified

- [...[10, 20, 30]] is a noop
- statements accessing array index properties are noops

## Input

`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
$(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(2);
  const z /*:array*/ = [10, 20, 30];
  const arrPatternSplat /*:array*/ = [...z];
  arrPatternSplat[0];
  arrPatternSplat[1];
  $(1, 2, z);
} else {
}
`````


## Settled


`````js filename=intro
const tmpSwitchDisc /*:unknown*/ = $(`a`);
const tmpBinBothRhs /*:unknown*/ = $(`a`);
$(1);
const tmpIfTest /*:boolean*/ = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(2);
  const z /*:array*/ = [10, 20, 30];
  $(1, 2, z);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
$(1);
if (tmpSwitchDisc === tmpBinBothRhs) {
  $(2);
  $(1, 2, [10, 20, 30]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "a" );
const b = $( "a" );
$( 1 );
const c = a === b;
if (c) {
  $( 2 );
  const d = [ 10, 20, 30 ];
  $( 1, 2, d );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpSwitchDisc = $(`a`);
const tmpBinBothRhs = $(`a`);
$(1);
const tmpIfTest = tmpSwitchDisc === tmpBinBothRhs;
if (tmpIfTest) {
  $(2);
  const z = [10, 20, 30];
  const arrPatternSplat = [...z];
  arrPatternSplat[0];
  arrPatternSplat[1];
  $(1, 2, z);
} else {
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1
 - 4: 2
 - 5: 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
