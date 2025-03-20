# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(1)) && $($(2))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpCompProp /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompProp) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpCompProp = $(tmpCalleeParam$1);
} else {
}
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompProp = $($(1));
if (tmpCompProp) {
  tmpCompProp = $($(2));
}
({}[tmpCompProp]);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 2 );
  b = $( c );
}
const d = {};
d[ b ];
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
