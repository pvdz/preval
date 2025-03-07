# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Assignments > Binary both > Auto ident object empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = {}) + (a = {}));
$(a);
`````

## Settled


`````js filename=intro
const a /*:object*/ = {};
const tmpClusterSSA_a /*:object*/ = {};
const tmpCalleeParam /*:primitive*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = {};
const tmpClusterSSA_a = {};
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = {}) + (a = {}));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = {};
let tmpBinBothLhs = a;
a = {};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = {};
const c = a + b;
$( c );
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '[object Object][object Object]'
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
