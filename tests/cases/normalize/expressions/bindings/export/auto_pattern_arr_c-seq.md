# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Export > Auto pattern arr c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let [a] = ($(10), $(20), $([1, 2]));
$(a);
`````


## Settled


`````js filename=intro
$(10);
$(20);
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
export { a };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
const tmpBindingPatternArrRoot = $([1, 2]);
const a = [...tmpBindingPatternArrRoot][0];
export { a };
$(a);
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
export { d as a };
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(10);
$(20);
let tmpCalleeParam = [1, 2];
let tmpBindingPatternArrRoot = $(tmpCalleeParam);
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
export { a };
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? ExportNamedDeclaration
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
