# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Statement > Switch case test > Auto ident call prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (1, 2, $(b)).$(1):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { $: $ };
const tmpMCOO /*:unknown*/ = $(b);
const tmpMCF /*:unknown*/ = tmpMCOO.$;
$dotCall(tmpMCF, tmpMCOO, `\$`, 1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpMCOO = $({ $: $ });
tmpMCOO.$(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { $: $ };
const b = $( a );
const c = b.$;
$dotCall( c, b, "$", 1 );
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
