# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) + (a = [1, 2, 3]));
$(a);
`````

## Settled


`````js filename=intro
$(`1,2,31,2,3`);
const tmpClusterSSA_a /*:array*/ = [1, 2, 3];
$(tmpClusterSSA_a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1,2,31,2,3`);
$([1, 2, 3]);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [1, 2, 3]) + (a = [1, 2, 3]));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
let tmpBinBothLhs = a;
a = [1, 2, 3];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "1,2,31,2,3" );
const a = [ 1, 2, 3 ];
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '1,2,31,2,3'
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
