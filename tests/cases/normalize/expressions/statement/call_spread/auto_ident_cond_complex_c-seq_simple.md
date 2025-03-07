# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident cond complex c-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParamSpread /*:unknown*/ = $(60);
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
if ($(1)) {
  const tmpClusterSSA_tmpCalleeParamSpread = $(60);
  $(...tmpClusterSSA_tmpCalleeParamSpread);
} else {
  const tmpClusterSSA_tmpCalleeParamSpread$1 = $($(100));
  $(...tmpClusterSSA_tmpCalleeParamSpread$1);
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($(1) ? (40, 50, $(60)) : $($(100))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParamSpread = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  tmpCalleeParamSpread = $(60);
} else {
  const tmpCalleeParam = $(100);
  tmpCalleeParamSpread = $(tmpCalleeParam);
}
$(...tmpCalleeParamSpread);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  const b = $( 60 );
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
 - 1: 1
 - 2: 60
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
