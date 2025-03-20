# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Bindings > Export > Auto pattern arr complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let [a] = $([1, 2]);
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
export { a };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $([1, 2]);
const a = [...bindingPatternArrRoot][0];
export { a };
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = $([1, 2]);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = $(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
export { d as a };
$( d );
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
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
