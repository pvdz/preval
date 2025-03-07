# Preval test case

# auto_ident_logic_or_and.md

> Normalize > Expressions > Assignments > Return > Auto ident logic or and
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(0)) || ($($(1)) && $($(2))));
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
let tmpCalleeParam$5 /*:unknown*/ = undefined;
const tmpCalleeParam /*:unknown*/ = $(0);
let a /*:unknown*/ = $(tmpCalleeParam);
if (a) {
  tmpCalleeParam$5 = a;
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  a = $(tmpCalleeParam$1);
  if (a) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    a = $(tmpCalleeParam$3);
    tmpCalleeParam$5 = a;
  } else {
    tmpCalleeParam$5 = a;
  }
}
$(tmpCalleeParam$5);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$5 = undefined;
let a = $($(0));
if (a) {
  tmpCalleeParam$5 = a;
} else {
  a = $($(1));
  if (a) {
    a = $($(2));
    tmpCalleeParam$5 = a;
  } else {
    tmpCalleeParam$5 = a;
  }
}
$(tmpCalleeParam$5);
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = $($(0)) || ($($(1)) && $($(2))));
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
    const tmpCalleeParam$1 = $(1);
    a = $(tmpCalleeParam$1);
    if (a) {
      const tmpCalleeParam$3 = $(2);
      a = $(tmpCalleeParam$3);
      return a;
    } else {
      return a;
    }
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( 0 );
let c = $( b );
if (c) {
  a = c;
}
else {
  const d = $( 1 );
  c = $( d );
  if (c) {
    const e = $( 2 );
    c = $( e );
    a = c;
  }
  else {
    a = c;
  }
}
$( a );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
