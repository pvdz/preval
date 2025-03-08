# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = typeof $(x))} after`;
$(a, x);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
const a /*:string*/ = typeof tmpUnaryArg;
$(tmpCalleeParam, a);
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpCalleeParam = [`before `, ` after`];
const a = typeof tmpUnaryArg;
$(tmpCalleeParam, a);
$(a, 1);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = typeof $(x)));
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpUnaryArg = $(x);
a = typeof tmpUnaryArg;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "before ", " after" ];
const c = typeof a;
$( b, c );
$( c, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], 'number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
