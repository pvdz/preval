# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) && (a = $($(0)) || $($(1)) || $($(2))));
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
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
  const tmpCalleeParam$7 /*:unknown*/ = $(0);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$9 /*:unknown*/ = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCalleeParam$11 /*:unknown*/ = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$11);
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
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
const tmpCalleeParam = a;
if (a) {
  let tmpNestedComplexRhs = $($(0));
  if (!tmpNestedComplexRhs) {
    tmpNestedComplexRhs = $($(1));
    if (!tmpNestedComplexRhs) {
      tmpNestedComplexRhs = $($(2));
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) && (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
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
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCalleeParam$7 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$7);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$9 = $(1);
    tmpNestedComplexRhs = $(tmpCalleeParam$9);
    if (tmpNestedComplexRhs) {
    } else {
      const tmpCalleeParam$11 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$11);
    }
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
$(tmpCalleeParam);
$(a);
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
const e = b;
if (b) {
  const f = $( 0 );
  let g = $( f );
  if (g) {

  }
  else {
    const h = $( 1 );
    g = $( h );
    if (g) {

    }
    else {
      const i = $( 2 );
      g = $( i );
    }
  }
  b = g;
  $( g );
}
else {
  $( e );
}
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 0
 - 6: 0
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
