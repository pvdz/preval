# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Arr element > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
(b.x = b.x = b.x = b.x = b.x = b.x = c) +
  (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````


## Settled


`````js filename=intro
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 3 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 999, b: 1000 }, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = { x: 3 };
$( a, b, 3 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
