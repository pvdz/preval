# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(0)) || 2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  $(...tmpCalleeParamSpread);
} else {
  $(...2);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParamSpread = $($(0));
if (tmpCalleeParamSpread) {
  $(...tmpCalleeParamSpread);
} else {
  $(...2);
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( ...b );
}
else {
  $( ...2 );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
