# Preval test case

# auto_base_assign_pattern_arr.md

> Normalize > Expressions > Bindings > Switch case > Auto base assign pattern arr
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = [];

    let a = ([b] = $([$(2)]));
    $(a, b);
}
`````


## Settled


`````js filename=intro
const tmpArrElement /*:unknown*/ = $(2);
const tmpCalleeParam /*:array*/ /*truthy*/ = [tmpArrElement];
const tmpNestedAssignArrPatternRhs /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpNestedAssignArrPatternRhs];
const tmpSSA_b /*:unknown*/ = tmpArrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs, tmpSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = $(2);
const tmpNestedAssignArrPatternRhs = $([tmpArrElement]);
$(tmpNestedAssignArrPatternRhs, [...tmpNestedAssignArrPatternRhs][0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 2 );
const b = [ a ];
const c = $( b );
const d = [ ...c ];
const e = d[ 0 ];
$( c, e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = undefined;
let a = undefined;
const tmpSwitchDisc = 1;
const tmpIfTest = tmpSwitchDisc === 1;
if (tmpIfTest) {
  b = [];
  const tmpArrElement = $(2);
  let tmpCalleeParam = [tmpArrElement];
  const tmpNestedAssignArrPatternRhs = $(tmpCalleeParam);
  const tmpArrPatternSplat = [...tmpNestedAssignArrPatternRhs];
  b = tmpArrPatternSplat[0];
  a = tmpNestedAssignArrPatternRhs;
  $(tmpNestedAssignArrPatternRhs, b);
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
 - 1: 2
 - 2: [2]
 - 3: [2], 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
