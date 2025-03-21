# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
($($(0)) || ($($(1)) && $($(2)))).a;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpCompObj /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompObj) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpCompObj = $(tmpCalleeParam$1);
  if (tmpCompObj) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpCompObj = $(tmpCalleeParam$3);
  } else {
  }
}
tmpCompObj.a;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCompObj = $($(0));
if (!tmpCompObj) {
  tmpCompObj = $($(1));
  if (tmpCompObj) {
    tmpCompObj = $($(2));
  }
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
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
b.a;
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
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
