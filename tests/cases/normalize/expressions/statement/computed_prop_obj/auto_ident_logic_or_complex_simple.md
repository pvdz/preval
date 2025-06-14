# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Computed prop obj > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(0)) || 2)["a"];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpCompObj /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompObj) {
} else {
  tmpCompObj = 2;
}
tmpCompObj.a;
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompObj = $($(0));
if (!tmpCompObj) {
  tmpCompObj = 2;
}
tmpCompObj.a;
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
  b = 2;
}
b.a;
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
let tmpCalleeParam = $(0);
let tmpCompObj = $(tmpCalleeParam);
if (tmpCompObj) {
} else {
  tmpCompObj = 2;
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
 - 1: 0
 - 2: 0
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
