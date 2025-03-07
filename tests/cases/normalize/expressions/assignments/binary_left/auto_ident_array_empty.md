# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Binary left > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) + $(100));
$(a);
`````

## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
$(tmpCalleeParam);
const a /*:array*/ = [];
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(100), `plustr`));
$([]);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = []) + $(100));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
$( b );
const c = [];
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: '100'
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
