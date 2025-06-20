# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic or and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || ($($(1)) && $($(2)))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
  $coerce(tmpCalleeParam, `string`);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$3);
  if (tmpClusterSSA_tmpCalleeParam) {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$5);
    $coerce(tmpClusterSSA_tmpCalleeParam$1, `string`);
  } else {
    $coerce(tmpClusterSSA_tmpCalleeParam, `string`);
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $($(0));
if (tmpCalleeParam) {
  $coerce(tmpCalleeParam, `string`);
} else {
  const tmpClusterSSA_tmpCalleeParam = $($(1));
  if (tmpClusterSSA_tmpCalleeParam) {
    $coerce($($(2)), `string`);
  } else {
    $coerce(tmpClusterSSA_tmpCalleeParam, `string`);
  }
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
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $coerce( f, "string" );
  }
  else {
    $coerce( d, "string" );
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
let tmpCalleeParam$1 = $(0);
let tmpCalleeParam = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
} else {
  let tmpCalleeParam$3 = $(1);
  tmpCalleeParam = $(tmpCalleeParam$3);
  if (tmpCalleeParam) {
    let tmpCalleeParam$5 = $(2);
    tmpCalleeParam = $(tmpCalleeParam$5);
  } else {
  }
}
tmpCompObj[tmpCalleeParam];
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
