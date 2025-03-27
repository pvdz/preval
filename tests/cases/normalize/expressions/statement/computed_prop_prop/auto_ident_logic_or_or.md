# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$($(0)) || $($(1)) || $($(2))];
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpCompProp /*:unknown*/ = $(tmpCalleeParam);
if (tmpCompProp) {
  $coerce(tmpCompProp, `string`);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpCompProp /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpCompProp) {
    $coerce(tmpClusterSSA_tmpCompProp, `string`);
  } else {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpCompProp$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $coerce(tmpClusterSSA_tmpCompProp$1, `string`);
  }
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
  const tmpClusterSSA_tmpCompProp = $($(1));
  if (tmpClusterSSA_tmpCompProp) {
    $coerce(tmpClusterSSA_tmpCompProp, `string`);
  } else {
    $coerce($($(2)), `string`);
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
    $coerce( d, "string" );
  }
  else {
    const e = $( 2 );
    const f = $( e );
    $coerce( f, "string" );
  }
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
