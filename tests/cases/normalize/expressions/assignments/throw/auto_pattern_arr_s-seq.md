# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > Throw > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
throw ([a] = ($(10), $(20), [1, 2]));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs /*:array*/ /*truthy*/ = [1, 2];
throw tmpNestedAssignArrPatternRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
throw tmpNestedAssignArrPatternRhs;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
[ ...a ];
$( 10 );
$( 20 );
const b = [ 1, 2 ];
throw b;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpBindingPatternArrRoot = { a: 999, b: 1000 };
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
let tmpThrowArg = undefined;
$(10);
$(20);
const tmpNestedAssignArrPatternRhs = [1, 2];
const tmpArrPatternSplat$1 = [...tmpNestedAssignArrPatternRhs];
a = tmpArrPatternSplat$1[0];
tmpThrowArg = tmpNestedAssignArrPatternRhs;
throw tmpThrowArg;
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ThrowStatement
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
