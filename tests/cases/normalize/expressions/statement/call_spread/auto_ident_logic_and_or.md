# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and or
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(($($(1)) && $($(1))) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
} else {
}
if (tmpCalleeParamSpread) {
  $(...tmpCalleeParamSpread);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpIfTest /*:boolean*/ = tmpClusterSSA_tmpCalleeParamSpread === ``;
  if (tmpIfTest) {
    $();
  } else {
    throw `Preval: Attempting to spread a falsy primitive that is not an empty string`;
  }
}
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParamSpread = $($(1));
if (tmpCalleeParamSpread) {
  tmpCalleeParamSpread = $($(1));
}
if (tmpCalleeParamSpread) {
  $(...tmpCalleeParamSpread);
} else {
  if ($($(2)) === ``) {
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
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
}
if (b) {
  $( ...b );
}
else {
  const d = $( 2 );
  const e = $( d );
  const f = e === "";
  if (f) {
    $();
  }
  else {
    throw "Preval: Attempting to spread a falsy primitive that is not an empty string";
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
let tmpCalleeParam = $(1);
let tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  let tmpCalleeParam$1 = $(1);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
} else {
}
if (tmpCalleeParamSpread) {
} else {
  let tmpCalleeParam$3 = $(2);
  tmpCalleeParamSpread = $(tmpCalleeParam$3);
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
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
