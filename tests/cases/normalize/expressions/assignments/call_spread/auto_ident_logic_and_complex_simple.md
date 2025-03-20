# Preval test case

# auto_ident_logic_and_complex_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic and complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = $($(1)) && 2));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  $(...2);
  $(2);
} else {
  const tmpIfTest /*:boolean*/ = a === ``;
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
const a = $($(1));
if (a) {
  $(...2);
  $(2);
} else {
  if (a === ``) {
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
const a = $( 1 );
const b = $( a );
if (b) {
  $( ...2 );
  $( 2 );
}
else {
  const c = b === "";
  if (c) {
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
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
