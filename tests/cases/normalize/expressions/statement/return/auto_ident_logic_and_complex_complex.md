# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Return > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return $($(1)) && $($(2));
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
if (tmpReturnArg) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_tmpReturnArg /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_tmpReturnArg);
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
  $($($(2)));
} else {
  $(tmpReturnArg);
}
$({ a: 999, b: 1000 });
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $($(1)) && $($(2));
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
    const tmpCalleeParam$1 = $(2);
    tmpReturnArg = $(tmpCalleeParam$1);
    return tmpReturnArg;
  } else {
    return tmpReturnArg;
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
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  $( d );
}
else {
  $( b );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
