# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Export > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
export let [a] = ($(10), $(20), [1, 2]);
$(a);
`````

## Settled


`````js filename=intro
$(10);
$(20);
const a /*:number*/ = 1;
export { a };
$(1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
const a = 1;
export { a };
$(1);
`````

## Pre Normal


`````js filename=intro
let [a] = ($(10), $(20), [1, 2]);
export { a };
$(a);
`````

## Normalized


`````js filename=intro
$(10);
$(20);
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
export { a };
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
const a = 1;
export { a as a };
$( 1 );
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
