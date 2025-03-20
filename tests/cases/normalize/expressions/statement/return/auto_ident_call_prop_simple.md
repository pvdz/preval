# Preval test case

# auto_ident_call_prop_simple.md

> Normalize > Expressions > Statement > Return > Auto ident call prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f() {
  return b.$(1);
}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
const tmpCalleeParam /*:unknown*/ = b.$(1);
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ $: $ }.$(1));
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = a.$( 1 );
$( b );
const c = {
  a: 999,
  b: 1000,
};
$( c );
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
