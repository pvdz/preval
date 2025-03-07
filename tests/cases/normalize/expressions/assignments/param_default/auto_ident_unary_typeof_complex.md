# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = typeof $(arg))) {}
$(f());
$(a, arg);
`````

## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
$(undefined);
const tmpNestedComplexRhs /*:string*/ = typeof tmpUnaryArg;
$(tmpNestedComplexRhs, 1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$(undefined);
$(typeof tmpUnaryArg, 1);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = typeof $(arg)) : tmpParamBare;
};
let arg = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, arg);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(arg);
    const tmpNestedComplexRhs = typeof tmpUnaryArg;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$( undefined );
const b = typeof a;
$( b, 1 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
