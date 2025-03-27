# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[($($(1)) && $($(1))) || $($(2))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpCompProp /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompProp) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpCompProp = $(tmpCalleeParam$1);
} else {
}
if (tmpCompProp) {
  $coerce(tmpCompProp, `string`);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCompProp /*:unknown*/ = $(tmpCalleeParam$3);
  $coerce(tmpClusterSSA_tmpCompProp, `string`);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompProp = $($(1));
if (tmpCompProp) {
  tmpCompProp = $($(1));
}
if (tmpCompProp) {
  $coerce(tmpCompProp, `string`);
} else {
  $coerce($($(2)), `string`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  $coerce( b, "string" );
}
else {
  const d = $( 2 );
  const e = $( d );
  $coerce( e, "string" );
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
