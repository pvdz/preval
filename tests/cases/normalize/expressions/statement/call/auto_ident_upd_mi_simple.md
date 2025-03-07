# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Call > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(--b);
$(a, b);
`````

## Settled


`````js filename=intro
$(0);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$({ a: 999, b: 1000 }, 0);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(--b);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let tmpCalleeParam = b;
$(tmpCalleeParam);
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
const a = {
  a: 999,
  b: 1000,
};
$( a, 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
