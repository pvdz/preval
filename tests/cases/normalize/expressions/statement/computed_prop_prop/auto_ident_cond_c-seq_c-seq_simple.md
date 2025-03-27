# Preval test case

# auto_ident_cond_c-seq_c-seq_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto ident cond c-seq c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[(10, 20, $(30)) ? (40, 50, $(60)) : $($(100))];
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCompProp /*:unknown*/ = $(60);
  $coerce(tmpClusterSSA_tmpCompProp, `string`);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCompProp$1 /*:unknown*/ = $(tmpCalleeParam);
  $coerce(tmpClusterSSA_tmpCompProp$1, `string`);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  $coerce($(60), `string`);
} else {
  $coerce($($(100)), `string`);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 60 );
  $coerce( b, "string" );
}
else {
  const c = $( 100 );
  const d = $( c );
  $coerce( d, "string" );
}
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
 - 1: 30
 - 2: 60
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
