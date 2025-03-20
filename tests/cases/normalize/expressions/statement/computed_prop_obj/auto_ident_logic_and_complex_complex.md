# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(1)) && $($(2)))["a"];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpCompObj /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  tmpCompObj = $(tmpCalleeParam$1);
} else {
}
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompObj = $($(1));
if (tmpCompObj) {
  tmpCompObj = $($(2));
}
tmpCompObj.a;
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
b.a;
const d = {
  a: 999,
  b: 1000,
};
$( d );
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
