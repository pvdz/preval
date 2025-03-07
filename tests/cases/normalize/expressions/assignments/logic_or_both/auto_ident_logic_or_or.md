# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or or
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) || (a = $($(0)) || $($(1)) || $($(2))));
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam$1);
if (a) {
  $(a);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$3);
  if (a) {
    $(a);
  } else {
    const tmpCalleeParam$5 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$5);
    if (a) {
      $(a);
    } else {
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
    }
  }
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = $($(0));
if (a) {
  $(a);
} else {
  a = $($(1));
  if (a) {
    $(a);
  } else {
    a = $($(2));
    if (a) {
      $(a);
    } else {
      let tmpNestedComplexRhs = $($(0));
      if (!tmpNestedComplexRhs) {
        tmpNestedComplexRhs = $($(1));
        if (!tmpNestedComplexRhs) {
          tmpNestedComplexRhs = $($(2));
        }
      }
      a = tmpNestedComplexRhs;
      $(tmpNestedComplexRhs);
    }
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(1)) || $($(2))) || (a = $($(0)) || $($(1)) || $($(2))));
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
} else {
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
  $( b );
}
else {
  const c = $( 1 );
  b = $( c );
  if (b) {
    $( b );
  }
  else {
    const d = $( 2 );
    b = $( d );
    if (b) {
      $( b );
    }
    else {
      const e = $( 0 );
      let f = $( e );
      if (f) {

      }
      else {
        const g = $( 1 );
        f = $( g );
        if (f) {

        }
        else {
          const h = $( 2 );
          f = $( h );
        }
      }
      b = f;
      $( f );
    }
  }
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
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
