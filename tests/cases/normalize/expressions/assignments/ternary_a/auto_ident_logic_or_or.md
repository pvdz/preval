# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) ? $(100) : $(200));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
  }
}
if (a) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
  $(tmpClusterSSA_tmpCalleeParam);
  $(a);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
  $(a);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (!a) {
  a = $($(1));
  if (!a) {
    a = $($(2));
  }
}
if (a) {
  $($(100));
  $(a);
} else {
  $($(200));
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) ? $(100) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpCalleeParam$1 = $(0);
a = $(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCalleeParam$3 = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
  } else {
    const tmpCalleeParam$5 = $(2);
    a = $(tmpCalleeParam$5);
  }
}
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
  $(tmpCalleeParam);
  $(a);
} else {
  tmpCalleeParam = $(200);
  $(tmpCalleeParam);
  $(a);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
if (b) {

}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {

  }
  else {
    const d = $( 2 );
    b = $( d );
  }
}
if (b) {
  const e = $( 100 );
  $( e );
  $( b );
}
else {
  const f = $( 200 );
  $( f );
  $( b );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 100
 - 6: 100
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
