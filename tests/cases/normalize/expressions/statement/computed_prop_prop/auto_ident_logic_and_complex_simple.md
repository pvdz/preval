# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(1)) && 2];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCompProp /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompProp) {
} else {
  $coerce(tmpCompProp, `string`);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $($(1));
if (!tmpCompProp) {
  $coerce(tmpCompProp, `string`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {

}
else {
  $coerce( b, "string" );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Todos triggered


None


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
