# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident upd ip simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$((a = b++) + (a = b++));
$(a, b);
`````

## Settled


`````js filename=intro
$(3);
$(2, 3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(2, 3);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$((a = b++) + (a = b++));
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
a = tmpPostUpdArgIdent;
let tmpBinBothLhs = a;
const tmpPostUpdArgIdent$1 = $coerce(b, `number`);
b = tmpPostUpdArgIdent$1 + 1;
a = tmpPostUpdArgIdent$1;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 2, 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
