# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(x)) + $(100));
$(a, x);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(100);
const a /*:string*/ = typeof tmpUnaryArg;
const tmpCalleeParam /*:string*/ = a + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpBinBothRhs = $(100);
const a = typeof tmpUnaryArg;
$(a + tmpBinBothRhs);
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = typeof $(x)) + $(100));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 100 );
const c = typeof a;
const d = c + b;
$( d );
$( c, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 'number100'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
