# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(1)) && $($(1)) && $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
  if (tmpCalleeParamSpread) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    tmpCalleeParamSpread = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
$(...tmpCalleeParamSpread);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParamSpread = $($(1));
if (tmpCalleeParamSpread) {
  tmpCalleeParamSpread = $($(1));
  if (tmpCalleeParamSpread) {
    tmpCalleeParamSpread = $($(2));
  }
}
$(...tmpCalleeParamSpread);
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
$( ...b );
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
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
