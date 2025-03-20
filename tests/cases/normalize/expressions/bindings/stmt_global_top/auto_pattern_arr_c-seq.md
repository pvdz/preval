# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Stmt global top > Auto pattern arr c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let [a] = ($(10), $(20), $([1, 2]));
$(a);
`````

## Settled


`````js filename=intro
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
const bindingPatternArrRoot = $([1, 2]);
$([...bindingPatternArrRoot][0]);
`````

## Pre Normal


`````js filename=intro
let [a] = ($(10), $(20), $([1, 2]));
$(a);
`````

## Normalized


`````js filename=intro
$(10);
$(20);
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = $(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
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
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
