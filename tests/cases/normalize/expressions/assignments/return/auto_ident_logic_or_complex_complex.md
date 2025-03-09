# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(0)) || $($(2)));
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const tmpClusterSSA_a /*:unknown*/ = $(tmpCalleeParam);
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_a$1 /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_a = $($(0));
if (tmpClusterSSA_a) {
  $(tmpClusterSSA_a);
  $(tmpClusterSSA_a);
} else {
  const tmpClusterSSA_a$1 = $($(2));
  $(tmpClusterSSA_a$1);
  $(tmpClusterSSA_a$1);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(0)) || $($(2)));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = $(0);
  a = $(tmpCalleeParam);
  if (a) {
    return a;
  } else {
    const tmpCalleeParam$1 = $(2);
    a = $(tmpCalleeParam$1);
    return a;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( d );
  $( d );
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
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
