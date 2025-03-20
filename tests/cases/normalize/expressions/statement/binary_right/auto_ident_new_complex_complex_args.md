# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > Binary right > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) + new ($($))($(1), $(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpBinBothRhs /*:object*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
tmpBinBothLhs + new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = $( $ );
const c = $( 1 );
const d = $( 2 );
const e = new b( c, d );
a + e;
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
