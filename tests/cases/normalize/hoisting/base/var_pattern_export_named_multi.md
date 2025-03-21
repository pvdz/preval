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
const x /*:number*/ = 10;
export { x };
const y /*:number*/ = 20;
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

## Pre Normal


`````js filename=intro
let x = undefined;
let y = undefined;
$(x, y);
([x] = [10]), ([y] = [20]);
$(x, y);
export { x };
export { y };
`````

## Normalized


`````js filename=intro
let x = undefined;
let y = undefined;
$(x, undefined);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
const arrAssignPatternRhs$1 = [20];
const arrPatternSplat$1 = [...arrAssignPatternRhs$1];
y = arrPatternSplat$1[0];
$(x, y);
export { x };
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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
