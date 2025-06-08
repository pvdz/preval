# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...($($(1)) && $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpCalleeParamSpread /*:unknown*/ = $(tmpCalleeParam$1);
  $(...tmpClusterSSA_tmpCalleeParamSpread);
} else {
  const tmpIfTest /*:boolean*/ = tmpCalleeParamSpread === ``;
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
const tmpCalleeParamSpread = $($(1));
if (tmpCalleeParamSpread) {
  const tmpClusterSSA_tmpCalleeParamSpread = $($(2));
  $(...tmpClusterSSA_tmpCalleeParamSpread);
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
  const c = $( 2 );
  const d = $( c );
  $( ...d );
}
else {
  const e = b === "";
  if (e) {
    $();
  }
  else {
    throw "Preval: Attempting to spread a falsy primitive that is not an empty string";
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = $(1);
let tmpCalleeParamSpread = $(tmpCalleeParam);
if (tmpCalleeParamSpread) {
  let tmpCalleeParam$1 = $(2);
  tmpCalleeParamSpread = $(tmpCalleeParam$1);
} else {
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
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
