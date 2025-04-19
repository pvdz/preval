# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)[$("$")](1) || $(b)[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpIfTest /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCCO$1 /*:unknown*/ = $(b);
  const tmpMCCP$1 /*:unknown*/ = $(`\$`);
  const tmpMCF$1 /*:unknown*/ = tmpMCCO$1[tmpMCCP$1];
  $dotCall(tmpMCF$1, tmpMCCO$1, undefined, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
const tmpMCCO = $(b);
const tmpMCCP = $(`\$`);
const tmpIfTest = tmpMCCO[tmpMCCP](1);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCCO$1 = $(b);
  const tmpMCCP$1 = $(`\$`);
  tmpMCCO$1[tmpMCCP$1](1);
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = $dotCall( d, b, undefined, 1 );
const f = {
  a: 999,
  b: 1000,
};
if (e) {
  $( f );
}
else {
  const g = $( a );
  const h = $( "$" );
  const i = g[ h ];
  $dotCall( i, g, undefined, 1 );
  $( f );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
