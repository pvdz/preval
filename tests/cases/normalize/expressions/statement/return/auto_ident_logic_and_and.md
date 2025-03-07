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
let tmpCalleeParam$5 /*:unknown*/ = undefined;
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpReturnArg) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(tmpCalleeParam$1);
  if (tmpClusterSSA_tmpReturnArg) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(tmpCalleeParam$3);
    tmpCalleeParam$5 = tmpClusterSSA_tmpReturnArg$1;
  } else {
    tmpCalleeParam$5 = tmpClusterSSA_tmpReturnArg;
  }
} else {
  tmpCalleeParam$5 = tmpReturnArg;
}
$(tmpCalleeParam$5);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam$5 = undefined;
const tmpReturnArg = $($(1));
if (tmpReturnArg) {
  const tmpClusterSSA_tmpReturnArg = $($(1));
  if (tmpClusterSSA_tmpReturnArg) {
    tmpCalleeParam$5 = $($(2));
  } else {
    tmpCalleeParam$5 = tmpClusterSSA_tmpReturnArg;
  }
} else {
  tmpCalleeParam$5 = tmpReturnArg;
}
$(tmpCalleeParam$5);
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
let a = undefined;
const b = $( 1 );
const c = $( b );
if (c) {
  const d = $( 1 );
  const e = $( d );
  if (e) {
    const f = $( 2 );
    const g = $( f );
    a = g;
  }
  else {
    a = e;
  }
}
else {
  a = c;
}
$( a );
const h = {
  a: 999,
  b: 1000,
};
$( h );
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
