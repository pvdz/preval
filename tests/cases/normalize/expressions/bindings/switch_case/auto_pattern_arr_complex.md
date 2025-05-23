# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Bindings > Switch case > Auto pattern arr complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = $([1, 2]);
    $(a);
}
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpArrAssignPatternRhs];
const a /*:unknown*/ = tmpArrPatternSplat[0];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrAssignPatternRhs = $([1, 2]);
$([...tmpArrAssignPatternRhs][0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  let tmpCalleeParam = [1, 2];
  const tmpArrAssignPatternRhs = $(tmpCalleeParam);
  const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
  a = tmpArrPatternSplat[0];
  $(a);
} else {
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
