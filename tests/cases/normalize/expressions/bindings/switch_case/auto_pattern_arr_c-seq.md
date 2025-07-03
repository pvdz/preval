# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Switch case > Auto pattern arr c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = ($(10), $(20), $([1, 2]));
    $(a);
}
`````


## Settled


`````js filename=intro
$(10);
$(20);
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const tmpArrAssignPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpArrAssignPatternRhs];
const a /*:unknown*/ = tmpArrPatternSplat[0];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
const tmpArrAssignPatternRhs = $([1, 2]);
$([...tmpArrAssignPatternRhs][0]);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
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
  $(10);
  $(20);
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
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
