# Preval test case

# func_param_default_arr.md

> Normalize > Pattern > Assignment > Base contexts > Func param default arr
>
> Testing simple pattern normalizations

TODO: arrow

## Input

`````js filename=intro
const f = (a = [ x ] = [100]) => { return $(a) };
f();
`````


## Settled


`````js filename=intro
const tmpNestedAssignArrPatternRhs /*:array*/ = [100];
const tmpArrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
x = tmpArrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignArrPatternRhs = [100];
x = [...tmpNestedAssignArrPatternRhs][0];
$(tmpNestedAssignArrPatternRhs);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 100 ];
const b = [ ...a ];
x = b[ 0 ];
$( a );
`````


## Todos triggered


- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
