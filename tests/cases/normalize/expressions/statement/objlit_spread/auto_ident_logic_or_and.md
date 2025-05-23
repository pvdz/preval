# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...($($(0)) || ($($(1)) && $($(2)))) });
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
let tmpObjSpreadArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpObjSpreadArg = $(tmpCalleeParam$1);
  if (tmpObjSpreadArg) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpObjSpreadArg = $(tmpCalleeParam$3);
  } else {
  }
}
({ ...tmpObjSpreadArg });
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpObjSpreadArg = $($(0));
if (!tmpObjSpreadArg) {
  tmpObjSpreadArg = $($(1));
  if (tmpObjSpreadArg) {
    tmpObjSpreadArg = $($(2));
  }
}
({ ...tmpObjSpreadArg });
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
{ ... b };
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
let tmpCalleeParam = $(0);
let tmpObjSpreadArg = $(tmpCalleeParam);
if (tmpObjSpreadArg) {
} else {
  let tmpCalleeParam$1 = $(1);
  tmpObjSpreadArg = $(tmpCalleeParam$1);
  if (tmpObjSpreadArg) {
    let tmpCalleeParam$3 = $(2);
    tmpObjSpreadArg = $(tmpCalleeParam$3);
  } else {
  }
}
({ ...tmpObjSpreadArg });
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
