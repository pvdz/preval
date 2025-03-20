# Preval test case

# auto_ident_logic_and_or.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic and or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
if (a) {
  $(...a);
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$3);
  const tmpIfTest /*:boolean*/ = tmpClusterSSA_a === ``;
  if (tmpIfTest) {
    $();
    $(``);
  } else {
    throw `Preval: Attempting to spread a falsy primitive that is not an empty string`;
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(1));
if (a) {
  a = $($(1));
}
if (a) {
  $(...a);
  $(a);
} else {
  if ($($(2)) === ``) {
    $();
    $(``);
  } else {
    throw `Preval: Attempting to spread a falsy primitive that is not an empty string`;
  }
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = ($($(1)) && $($(1))) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
a = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 = $(1);
  a = $(tmpCalleeParam$1);
} else {
}
if (a) {
} else {
  const tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
}
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
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
  $( b );
}
else {
  const d = $( 2 );
  const e = $( d );
  const f = e === "";
  if (f) {
    $();
    $( "" );
  }
  else {
    throw "Preval: Attempting to spread a falsy primitive that is not an empty string";
  }
}
`````

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
