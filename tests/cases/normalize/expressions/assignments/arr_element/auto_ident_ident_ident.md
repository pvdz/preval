# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Arr element > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$((a = b = 2) + (a = b = 2));
$(a, b, c);
`````

## Settled


`````js filename=intro
$(4);
$(2, 2, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(4);
$(2, 2, 2);
`````

## Pre Normal


`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$((a = b = 2) + (a = b = 2));
$(a, b, c);
`````

## Normalized


`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
b = 2;
a = 2;
let tmpBinBothLhs = a;
b = 2;
a = 2;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, b, c);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 4 );
$( 2, 2, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 4
 - 2: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
