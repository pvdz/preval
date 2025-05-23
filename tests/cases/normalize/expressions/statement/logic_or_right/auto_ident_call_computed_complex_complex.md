# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Statement > Logic or right > Auto ident call computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) || $(b)[$("$")](1);
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(100);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const b /*:object*/ = { $: $ };
  const tmpMCCO /*:unknown*/ = $(b);
  const tmpMCCP /*:unknown*/ = $(`\$`);
  const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
  $dotCall(tmpMCF, tmpMCCO, undefined, 1);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCCO = $({ $: $ });
  const tmpMCCP = $(`\$`);
  tmpMCCO[tmpMCCP](1);
  $(a);
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
if (a) {
  $( b );
}
else {
  const c = { $: $ };
  const d = $( c );
  const e = $( "$" );
  const f = d[ e ];
  $dotCall( f, d, undefined, 1 );
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  $(a);
} else {
  const tmpMCCO = $(b);
  const tmpMCCP = $(`\$`);
  const tmpMCF = tmpMCCO[tmpMCCP];
  $dotCall(tmpMCF, tmpMCCO, undefined, 1);
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
