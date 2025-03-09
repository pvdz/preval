# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident logic and complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($(1)) && $($(2));
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  $(tmpCalleeParam$1);
  $(a);
  $(undefined);
} else {
  $(a);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $($(1));
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $($(2));
  $(a);
  $(undefined);
} else {
  $(a);
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  $($(1)) && $($(2));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpCalleeParam = $(1);
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCalleeParam$1 = $(2);
    $(tmpCalleeParam$1);
    $(a);
    return undefined;
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam$3 = f();
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  const d = $( 2 );
  $( d );
  $( c );
  $( undefined );
}
else {
  $( c );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: { a: '999', b: '1000' }
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
