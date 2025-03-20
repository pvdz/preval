# Preval test case

# auto_ident_cond_c-seq_simple_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond c-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...((10, 20, $(30)) ? $(2) : $($(100))));
$(a);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(30);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParamSpread /*:unknown*/ = $(2);
  $(...tmpClusterSSA_tmpCalleeParamSpread);
} else {
  const tmpCalleeParam /*:unknown*/ = $(100);
  const tmpClusterSSA_tmpCalleeParamSpread$1 /*:unknown*/ = $(tmpCalleeParam);
  $(...tmpClusterSSA_tmpCalleeParamSpread$1);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(30)) {
  const tmpClusterSSA_tmpCalleeParamSpread = $(2);
  $(...tmpClusterSSA_tmpCalleeParamSpread);
} else {
  const tmpClusterSSA_tmpCalleeParamSpread$1 = $($(100));
  $(...tmpClusterSSA_tmpCalleeParamSpread$1);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 30 );
if (a) {
  const b = $( 2 );
  $( ...b );
}
else {
  const c = $( 100 );
  const d = $( c );
  $( ...d );
}
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
 - 1: 30
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
