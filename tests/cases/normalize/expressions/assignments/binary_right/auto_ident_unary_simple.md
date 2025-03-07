# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = typeof x));
$(a, x);
`````

## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpStringConcatR /*:string*/ = $coerce(tmpBinBothLhs, `plustr`);
const tmpCalleeParam /*:string*/ = `${tmpStringConcatR}number`;
$(tmpCalleeParam);
$(`number`, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`${$(100)}number`);
$(`number`, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$($(100) + (a = typeof x));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
a = typeof x;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $coerce( a, "plustr" );
const c = `${b}number`;
$( c );
$( "number", 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: '100number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
