# Preval test case

# simple_pattern2.md

> Normalize > Binding > Case-block > Simple pattern2
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1;
let x = 1;
let y = 2;
let z = [10, 20, 30];
let a$1 = undefined;
const tmpSwitchValue = $('a');
let tmpSwitchCaseToStart = 1;
const tmpBinLhs = $('a');
const tmpIfTest = tmpBinLhs === tmpSwitchValue;
if (tmpIfTest) {
  tmpSwitchCaseToStart = 0;
} else {
}
tmpSwitchBreak: {
  const tmpIfTest$1 = tmpSwitchCaseToStart <= 0;
  if (tmpIfTest$1) {
    const tmpNestedAssignArrPatternRhs = z;
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    a$1 = tmpNestedAssignArrPatternRhs;
    break tmpSwitchBreak;
  } else {
  }
}
$(a, x, y, z);
`````


## Settled


`````js filename=intro
const tmpSwitchValue /*:unknown*/ = $(`a`);
const tmpBinLhs /*:unknown*/ = $(`a`);
const tmpIfTest$1 /*:boolean*/ = tmpBinLhs === tmpSwitchValue;
const z /*:array*/ = [10, 20, 30];
if (tmpIfTest$1) {
  const arrPatternSplat /*:array*/ = [...z];
  const x /*:unknown*/ = arrPatternSplat[0];
  const y /*:unknown*/ = arrPatternSplat[1];
  $(1, x, y, z);
} else {
  $(1, 1, 2, z);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpSwitchValue = $(`a`);
const tmpIfTest$1 = $(`a`) === tmpSwitchValue;
const z = [10, 20, 30];
if (tmpIfTest$1) {
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


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
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
