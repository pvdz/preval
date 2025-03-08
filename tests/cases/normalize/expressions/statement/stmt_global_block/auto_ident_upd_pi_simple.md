# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident upd pi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = 1;

  let a = { a: 999, b: 1000 };
  ++b;
  $(a, b);
}
`````

## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 2);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, 2);
`````

## Pre Normal


`````js filename=intro
{
  let b = 1;
  let a = { a: 999, b: 1000 };
  ++b;
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = $coerce(b, `number`);
b = tmpPostUpdArgIdent + 1;
$(a, b);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a, 2 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
