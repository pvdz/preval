# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > Logic and both > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new ($($))($(1), $(2)) && new ($($))($(1), $(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpNewCallee$1 /*:unknown*/ = $($);
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpCalleeParam$5 /*:unknown*/ = $(2);
new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpNewCallee$1 = $($);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
new a( b, c );
const d = $( $ );
const e = $( 1 );
const f = $( 2 );
new d( e, f );
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: '<$>'
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
