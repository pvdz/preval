# Preval test case

# auto_ident_upd_i m_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident upd i m simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b--) + (a = b--));
$(a, b);
`````

## Settled


`````js filename=intro
$(1);
$(0, -1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(0, -1);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b--) + (a = b--));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent - 1;
a = tmpPostUpdArgIdent;
let tmpBinBothLhs = a;
const tmpPostUpdArgIdent$1 = $coerce(b, `number`);
b = tmpPostUpdArgIdent$1 - 1;
a = tmpPostUpdArgIdent$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 0, -1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 0, -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
