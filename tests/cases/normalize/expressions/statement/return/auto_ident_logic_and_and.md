# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > Return > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(1)) && $($(1)) && $($(2));
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpReturnArg) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpReturnArg) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(tmpCalleeParam$3);
    $(tmpClusterSSA_tmpReturnArg$1);
  } else {
    $(tmpClusterSSA_tmpReturnArg);
  }
} else {
  $(tmpReturnArg);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpReturnArg = $($(1));
if (tmpReturnArg) {
  const tmpClusterSSA_tmpReturnArg = $($(1));
  if (tmpClusterSSA_tmpReturnArg) {
    $($($(2)));
  } else {
    $(tmpClusterSSA_tmpReturnArg);
  }
} else {
  $(tmpReturnArg);
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $($(1)) && $($(1)) && $($(2));
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = $(1);
  let tmpReturnArg = $(tmpCalleeParam);
  if (tmpReturnArg) {
    const tmpCalleeParam$1 = $(1);
    tmpReturnArg = $(tmpCalleeParam$1);
    if (tmpReturnArg) {
      const tmpCalleeParam$3 = $(2);
      tmpReturnArg = $(tmpCalleeParam$3);
      return tmpReturnArg;
    } else {
      return tmpReturnArg;
    }
  } else {
    return tmpReturnArg;
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
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 1 );
  const d = $( c );
  if (d) {
    const e = $( 2 );
    const f = $( e );
    $( f );
  }
  else {
    $( d );
  }
}
else {
  $( b );
}
const g = {
  a: 999,
  b: 1000,
};
$( g );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
