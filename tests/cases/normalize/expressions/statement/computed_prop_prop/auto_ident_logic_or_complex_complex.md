# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || $($(2))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpCompProp /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompProp) {
  $coerce(tmpCompProp, `string`);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCompProp /*:unknown*/ = $(tmpCalleeParam$1);
  $coerce(tmpClusterSSA_tmpCompProp, `string`);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $($(0));
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
const a = $( 0 );
const b = $( a );
if (b) {
  $coerce( b, "string" );
}
else {
  const c = $( 2 );
  const d = $( c );
  $coerce( d, "string" );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
