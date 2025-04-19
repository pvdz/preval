# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Call > Auto ident call computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((1, 2, $(b))[$("$")](1));
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpMCCO /*:unknown*/ = $(b);
const tmpMCCP /*:unknown*/ = $(`\$`);
const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined, 1);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCO = $({ $: $ });
const tmpMCCP = $(`\$`);
$(tmpMCCO[tmpMCCP](1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
const e = $dotCall( d, b, undefined, 1 );
$( e );
const f = {
  a: 999,
  b: 1000,
};
$( f );
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
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
