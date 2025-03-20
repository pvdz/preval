# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Switch case test > Auto ident call computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case (1, 2, b)["$"](1):
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const b /*:object*/ = { $: $ };
b.$(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
({ $: $ }.$(1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = { $: $ };
a.$( 1 );
const b = {
  a: 999,
  b: 1000,
};
$( b );
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
