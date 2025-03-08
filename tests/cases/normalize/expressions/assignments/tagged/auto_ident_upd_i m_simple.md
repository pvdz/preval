# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$`before ${(a = b--)} after`;
$(a, b);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, 1);
$(1, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`before `, ` after`], 1);
$(1, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = b--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = tmpPostUpdArgIdent;
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 1 );
$( 1, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['before ', ' after'], 1
 - 2: 1, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
