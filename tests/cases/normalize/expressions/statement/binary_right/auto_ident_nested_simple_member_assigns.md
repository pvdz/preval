# Preval test case

# auto_ident_nested_simple_member_assigns.md

> Normalize > Expressions > Statement > Binary right > Auto ident nested simple member assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
$(100) + (b.x = b.x = b.x = b.x = b.x = b.x = c);
$(a, b, c);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
tmpBinBothLhs + 0;
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 3 };
$(a, b, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100) + 0;
$({ a: 999, b: 1000 }, { x: 3 }, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
a + 0;
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 3 };
$( b, c, 3 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
