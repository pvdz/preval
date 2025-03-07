# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$([...(a = $(b))]);
$(a, b);
`````

## Settled


`````js filename=intro
const a /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ = [...a];
$(tmpCalleeParam);
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = $(1);
$([...a]);
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$([...(a = $(b))]);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
a = $(b);
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ ...a ];
$( b );
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
