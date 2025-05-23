# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(($($(1)) && $($(1))) || $($(2))).a;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpCompObj /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompObj) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpCompObj = $(tmpCalleeParam$1);
} else {
}
if (tmpCompObj) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  tmpCompObj = $(tmpCalleeParam$3);
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
  tmpCompObj = $($(1));
}
if (!tmpCompObj) {
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
  const c = $( 1 );
  b = $( c );
}
if (b) {

}
else {
  const d = $( 2 );
  b = $( d );
}
b.a;
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCalleeParam = $(1);
let tmpCompObj = $(tmpCalleeParam);
if (tmpCompObj) {
  let tmpCalleeParam$1 = $(1);
  tmpCompObj = $(tmpCalleeParam$1);
} else {
}
if (tmpCompObj) {
} else {
  let tmpCalleeParam$3 = $(2);
  tmpCompObj = $(tmpCalleeParam$3);
}
tmpCompObj.a;
$(a);
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
