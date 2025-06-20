# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > Logic and both > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
new $($(1), $(2)) && new $($(1), $(2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParam$1 /*:unknown*/ = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = $(1);
const tmpCalleeParam$5 /*:unknown*/ = $(2);
new $(tmpCalleeParam$3, tmpCalleeParam$5);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$5 = $(2);
new $(tmpCalleeParam$3, tmpCalleeParam$5);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
new $( a, b );
const c = $( 1 );
const d = $( 2 );
new $( c, d );
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
const tmpNewCallee = $;
let tmpCalleeParam = $(1);
let tmpCalleeParam$1 = $(2);
const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
if (tmpIfTest) {
  const tmpNewCallee$1 = $;
  let tmpCalleeParam$3 = $(1);
  let tmpCalleeParam$5 = $(2);
  new tmpNewCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
  $(a);
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 2
 - 6: 1, 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
