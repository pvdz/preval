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
let tmpCompProp /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompProp) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpCompProp = $(tmpCalleeParam$1);
}
const obj /*:object*/ = {};
obj[tmpCompProp];
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompProp = $($(0));
if (!tmpCompProp) {
  tmpCompProp = $($(2));
}
({}[tmpCompProp]);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
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
