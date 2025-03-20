# Preval test case

# auto_ident_upd_pi_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident upd pi complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
switch (++$($(b)).x) {
  default:
    $(100);
}
$(a, b);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
$(100);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
tmpUpdObj.x = $coerce(tmpUpdObj.x, `number`) + 1;
$(100);
$({ a: 999, b: 1000 }, b);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
$( 100 );
const g = {
  a: 999,
  b: 1000,
};
$( g, a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 100
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
