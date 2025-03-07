# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Binary both > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) + (a = []));
$(a);
`````

## Settled


`````js filename=intro
$(``);
const tmpClusterSSA_a /*:array*/ = [];
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(``);
$([]);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) + (a = []));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpBinBothLhs = a;
a = [];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "" );
const a = [];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ''
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
