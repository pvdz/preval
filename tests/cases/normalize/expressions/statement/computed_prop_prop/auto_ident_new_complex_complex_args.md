# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
obj[new ($($))($(1), $(2))];
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpCompProp /*:object*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
const tmpCompProp = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
({}[tmpCompProp]);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = new a( b, c );
const e = {};
e[ d ];
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
 - 1: '<$>'
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
