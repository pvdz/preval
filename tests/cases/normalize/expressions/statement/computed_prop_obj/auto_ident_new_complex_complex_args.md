# Preval test case

# auto_ident_new_complex_complex_args.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident new complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
let obj = {};
new ($($))($(1), $(2))["a"];
$(a);
`````


## Settled


`````js filename=intro
const tmpNewCallee /*:unknown*/ = $($);
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
const tmpCompObj /*:object*/ /*truthy*/ = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
tmpCompObj.a;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNewCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1).a;
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
const d = new a( b, c );
d.a;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let obj = {};
const tmpNewCallee = $($);
let tmpCalleeParam = $(1);
let tmpCalleeParam$1 = $(2);
const tmpCompObj = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
tmpCompObj.a;
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
 - 3: 2
 - 4: 1, 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
