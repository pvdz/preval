# Preval test case

# auto_pattern_arr_simple.md

> Normalize > Expressions > Statement > Ternary a > Auto pattern arr simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a, b] = [1, 2];
$(a, b);
`````

## Settled


`````js filename=intro
$(1, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, 2);
`````

## Pre Normal


`````js filename=intro
let [a, b] = [1, 2];
$(a, b);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = [1, 2];
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
let b = arrPatternSplat[1];
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope