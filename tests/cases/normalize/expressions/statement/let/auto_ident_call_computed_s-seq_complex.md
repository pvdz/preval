# Preval test case

# auto_ident_call_computed_s-seq_complex.md

> Normalize > Expressions > Statement > Let > Auto ident call computed s-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let xyz = (1, 2, b)[$("$")](1);
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const tmpMCCP /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpMCF /*:unknown*/ = b[tmpMCCP];
const xyz /*:unknown*/ = $dotCall(tmpMCF, b, undefined, 1);
$(xyz);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpMCCP = $(`\$`);
const b = { $: $ };
$(b[tmpMCCP](1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
const d = $dotCall( c, b, undefined, 1 );
$( d );
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
