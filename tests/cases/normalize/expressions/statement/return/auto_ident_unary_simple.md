# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > Return > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return typeof x;
}
$(f());
$(a, x);
`````


## Settled


`````js filename=intro
$(`number`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`number`);
$({ a: 999, b: 1000 }, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "number" );
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'number'
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
