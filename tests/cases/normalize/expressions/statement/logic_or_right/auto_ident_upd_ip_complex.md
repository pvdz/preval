# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > Logic or right > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(100) || $($(b)).x++;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
const b /*:object*/ = { x: 1 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpCalleeParam /*:unknown*/ = $(b);
  const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
  const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
  const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  $(a, b);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
const b = { x: 1 };
if (tmpIfTest) {
  $(a, b);
} else {
  const tmpUpdObj = $($(b));
  tmpUpdObj.x = $coerce(tmpUpdObj.x, `number`) + 1;
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
if (a) {
  $( b, c );
}
else {
  const d = $( c );
  const e = $( d );
  const f = e.x;
  const g = $coerce( f, "number" );
  const h = g + 1;
  e.x = h;
  $( b, c );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, { x: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
