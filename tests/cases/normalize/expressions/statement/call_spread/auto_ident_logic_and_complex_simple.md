# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(1)) && 2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  $(...2);
} else {
  const tmpIfTest /*:boolean*/ = tmpCalleeParamSpread === ``;
  if (tmpIfTest) {
    $();
  } else {
    throw `Preval: Attempting to spread a falsy primitive that is not an empty string`;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParamSpread = $($(1));
if (tmpCalleeParamSpread) {
  $(...2);
} else {
  if (tmpCalleeParamSpread === ``) {
    $();
  } else {
    throw `Preval: Attempting to spread a falsy primitive that is not an empty string`;
  }
}
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  $( ...2 );
}
else {
  const c = b === "";
  if (c) {
    $();
  }
  else {
    throw "Preval: Attempting to spread a falsy primitive that is not an empty string";
  }
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
