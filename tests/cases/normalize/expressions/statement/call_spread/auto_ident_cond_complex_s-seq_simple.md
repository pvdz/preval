# Preval test case

# auto_ident_cond_complex_s-seq_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond complex s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($(1) ? (40, 50, 60) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(...60);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
  $(...tmpClusterSSA_tmpCalleeParamSpread);
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(...60);
} else {
  const tmpClusterSSA_tmpCalleeParamSpread = $($(100));
  $(...tmpClusterSSA_tmpCalleeParamSpread);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( ...60 );
}
else {
  const b = $( 100 );
  const c = $( b );
  $( ...c );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParamSpread = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParamSpread = 60;
} else {
  let tmpCalleeParam = $(100);
  tmpCalleeParamSpread = $(tmpCalleeParam);
}
$(...tmpCalleeParamSpread);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
