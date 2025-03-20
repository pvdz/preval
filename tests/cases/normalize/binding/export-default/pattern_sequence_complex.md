# Preval test case

# pattern_sequence_complex.md

> Normalize > Binding > Export-default > Pattern sequence complex
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
let a = 1, b = 2, z = [10, 20, 30];
export let [x, y] = ($(a), $(b), $(z));
$(x, y, z);
`````


## Settled


`````js filename=intro
$(1);
$(2);
const z /*:array*/ = [10, 20, 30];
const bindingPatternArrRoot /*:unknown*/ = $(z);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const x /*:unknown*/ = arrPatternSplat[0];
const y /*:unknown*/ = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const z = [10, 20, 30];
const bindingPatternArrRoot = $(z);
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
const y = arrPatternSplat[1];
export { x, y };
$(x, y, z);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
const e = c[ 1 ];
export { d as x,e as y };
$( d, e, a );
`````


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
