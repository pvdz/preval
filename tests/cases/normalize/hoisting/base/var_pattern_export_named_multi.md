# Preval test case

# var_pattern_export_named_multi.md

> Normalize > Hoisting > Base > Var pattern export named multi
>
> Exported var bindings are still hoisted

## Input

`````js filename=intro
$(x, y);
export var [x] = [10], [y] = [20];
$(x, y);
`````


## Settled


`````js filename=intro
$(undefined, undefined);
$(10, 20);
const x /*:number*/ /*truthy*/ = 10;
export { x };
const y /*:number*/ /*truthy*/ = 20;
export { y };
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined, undefined);
$(10, 20);
const x = 10;
export { x };
const y = 20;
export { y };
`````


## PST Settled
With rename=true

`````js filename=intro
$( undefined, undefined );
$( 10, 20 );
const a = 10;
export { a as x };
const b = 20;
export { b as y };
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let y = undefined;
$(x, undefined);
const tmpArrAssignPatternRhs = [10];
const tmpArrPatternSplat = [...tmpArrAssignPatternRhs];
x = tmpArrPatternSplat[0];
const tmpArrAssignPatternRhs$1 = [20];
const tmpArrPatternSplat$1 = [...tmpArrAssignPatternRhs$1];
y = tmpArrPatternSplat$1[0];
$(x, y);
export { x };
export { y };
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
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
