# Preval test case

# pattern.md

> Normalize > Binding > Export-default > Pattern
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let z = [10, 20, 30];
export let [x, y] = z;
$(x, y, z);
`````

## Settled


`````js filename=intro
const z /*:array*/ = [10, 20, 30];
const arrPatternSplat /*:array*/ = [...z];
const x /*:unknown*/ = arrPatternSplat[0];
const y /*:unknown*/ = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const z = [10, 20, 30];
const arrPatternSplat = [...z];
const x = arrPatternSplat[0];
const y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## Pre Normal


`````js filename=intro
let z = [10, 20, 30];
let [x, y] = z;
export { x, y };
$(x, y, z);
`````

## Normalized


`````js filename=intro
let z = [10, 20, 30];
let bindingPatternArrRoot = z;
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
let y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 10, 20, 30 ];
const b = [ ...a ];
const c = b[ 0 ];
const d = b[ 1 ];
export { c as x,d as y };
$( c, d, a );
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
