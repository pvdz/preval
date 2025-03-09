# Preval test case

# auto_ident_opt_call_complex_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident opt call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  $($)?.($(1));
  $(a);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpChainElementCall /*:unknown*/ = $($);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  const tmpCalleeParam$3 /*:unknown*/ = $(1);
  $dotCall(tmpChainElementCall, $, undefined, tmpCalleeParam$3);
  $(a);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
  $(undefined);
} else {
  $dotCall(tmpChainElementCall, $, undefined, $(1));
  $(a);
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  $($)?.($(1));
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpChainRootCall = $;
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpCalleeParam = tmpChainElementCall;
    const tmpCalleeParam$1 = tmpChainRootCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
    $(a);
    return undefined;
  } else {
    $(a);
    return undefined;
  }
};
const tmpCalleeParam$5 = f();
$(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( $ );
const b = a == null;
const c = {
  a: 999,
  b: 1000,
};
if (b) {
  $( c );
  $( undefined );
}
else {
  const d = $( 1 );
  $dotCall( a, $, undefined, d );
  $( c );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
