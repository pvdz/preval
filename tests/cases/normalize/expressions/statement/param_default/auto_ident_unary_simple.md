# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Statement > Param default > Auto ident unary simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(arg = typeof x) {}
$(f());
$(a, x);
`````

## Settled


`````js filename=intro
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(undefined);
$({ a: 999, b: 1000 }, 1);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let arg = tmpParamBare === undefined ? typeof x : tmpParamBare;
};
let x = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, x);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let arg = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    arg = typeof x;
    return undefined;
  } else {
    arg = tmpParamBare;
    return undefined;
  }
};
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( undefined );
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
