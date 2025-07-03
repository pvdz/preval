# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Statement > Ternary c > Auto ident upd ip complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(0) ? $(100) : $($(b)).x++;
$(a, b);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const b /*:object*/ /*truthy*/ = { x: 1 };
if (tmpIfTest) {
  $(100);
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
const tmpIfTest = $(0);
const a = { a: 999, b: 1000 };
const b = { x: 1 };
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  const tmpUpdObj = $($(b));
  tmpUpdObj.x = Number(tmpUpdObj.x) + 1;
  $(a, b);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = {
  a: 999,
  b: 1000,
};
const c = { x: 1 };
if (a) {
  $( 100 );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(100);
  $(a, b);
} else {
  let tmpCalleeParam = $(b);
  const tmpUpdObj = $(tmpCalleeParam);
  const tmpUpdProp = tmpUpdObj.x;
  const tmpUpdNum = $coerce(tmpUpdProp, `number`);
  const tmpUpdInc = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  $(a, b);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: { x: '1' }
 - 3: { x: '1' }
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
