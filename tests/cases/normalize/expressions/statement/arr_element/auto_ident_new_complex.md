# Preval test case

# auto_ident_new_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident new complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
new ($($))(1) + new ($($))(1);
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpBinBothLhs /*:object*/ = new tmpNewCallee(1);
const tmpNewCallee$1 /*:unknown*/ = $($);
const tmpBinBothRhs /*:object*/ = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpNewCallee$1 = $($);
tmpBinBothLhs + new tmpNewCallee$1(1);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = new a( 1 );
const c = $( $ );
const d = new c( 1 );
b + d;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpNewCallee = $($);
const tmpBinBothLhs = new tmpNewCallee(1);
const tmpNewCallee$1 = $($);
const tmpBinBothRhs = new tmpNewCallee$1(1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: '<$>'
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
