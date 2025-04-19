# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Statement > Logic and both > Auto ident call prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b).$(1) && $(b).$(1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCallObj /*:unknown*/ = $(b);
const tmpCallCompVal /*:unknown*/ = tmpCallObj.$;
const tmpIfTest /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallObj, `\$`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallObj$1 /*:unknown*/ = $(b);
  const tmpCallCompVal$1 /*:unknown*/ = tmpCallObj$1.$;
  $dotCall(tmpCallCompVal$1, tmpCallObj$1, `\$`, 1);
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpCallObj = $(b);
const tmpIfTest = tmpCallObj.$(1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCallObj$1 = $(b);
  tmpCallObj$1.$(1);
  $(a);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
const d = $dotCall( c, b, "$", 1 );
const e = {
  a: 999,
  b: 1000,
};
if (d) {
  const f = $( a );
  const g = f.$;
  $dotCall( g, f, "$", 1 );
  $( e );
}
else {
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
