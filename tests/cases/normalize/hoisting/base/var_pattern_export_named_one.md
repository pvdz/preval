# Preval test case

# var_pattern_export_named_one.md

> Normalize > Hoisting > Base > Var pattern export named one
>
> Exported var bindings are still hoisted

## Input

`````js filename=intro
$(x);
export var [x] = [10];
$(x);
`````

## Settled


`````js filename=intro
$(undefined);
$(10);
const x /*:number*/ = 10;
export { x };
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$(10);
const x = 10;
export { x };
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
[x] = [10];
$(x);
export { x };
`````

## Normalized


`````js filename=intro
let x = undefined;
$(undefined);
const arrAssignPatternRhs = [10];
const arrPatternSplat = [...arrAssignPatternRhs];
x = arrPatternSplat[0];
$(x);
export { x };
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
$( 10 );
const a = 10;
export { a as x };
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
