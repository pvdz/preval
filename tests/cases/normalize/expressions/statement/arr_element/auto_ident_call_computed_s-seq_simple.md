# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident call computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
(1, 2, b)["$"](1) + (1, 2, b)["$"](1);
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpBinBothLhs /*:unknown*/ = b.$(1);
const tmpBinBothRhs /*:unknown*/ = b.$(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
b.$(1) + b.$(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
const c = a.$( 1 );
b + c;
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
