# Preval test case

# pattern.md

> Normalize > Binding > Case-block > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let x = 1, y = 2, z = [10, 20, 30];
switch ($('a')) { case $('a'): let [x, y] = z; break; }
$(x, y, z);
`````


## Settled


`````js filename=intro
$(`a`);
$(`a`);
const z /*:array*/ /*truthy*/ = [10, 20, 30];
$(1, 2, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$(`a`);
$(1, 2, [10, 20, 30]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
$( "a" );
const a = [ 10, 20, 30 ];
$( 1, 2, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
let y = 2;
let z = [10, 20, 30];
tmpSwitchBreak: {
  let x$1 = undefined;
  let y$1 = undefined;
  const tmpSwitchDisc = $(`a`);
  const tmpBinBothLhs = tmpSwitchDisc;
  const tmpBinBothRhs = $(`a`);
  const tmpIfTest = tmpBinBothLhs === tmpBinBothRhs;
  if (tmpIfTest) {
    const tmpArrAssignPatternRhs = z;
    const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
    x$1 = tmpArrPatternSplat[0];
    y$1 = tmpArrPatternSplat[1];
    break tmpSwitchBreak;
  } else {
  }
}
$(x, y, z);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'a'
 - 3: 1, 2, [10, 20, 30]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
