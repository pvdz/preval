# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($(0)) || $($(2))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(...a);
  $(a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam$1);
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
const a = $($(0));
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


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( ...b );
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  const e = d === "";
  if (e) {
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
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
