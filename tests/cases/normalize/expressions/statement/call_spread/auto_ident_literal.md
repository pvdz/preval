# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Statement > Call spread > Auto ident literal
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(..."foo");
$(a);
`````

## Settled


`````js filename=intro
$(...`foo`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...`foo`);
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...`foo`);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...`foo`);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
$( ..."foo" );
const a = {
  a: 999,
  b: 1000,
};
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'f', 'o', 'o'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
