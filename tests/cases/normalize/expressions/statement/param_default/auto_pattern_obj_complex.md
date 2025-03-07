# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Param default > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
function f(p = $({ a: 1, b: 2 })) {}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
$(tmpCalleeParam);
$(undefined);
$(999);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 1, b: 2 });
$(undefined);
$(999);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $({ a: 1, b: 2 }) : tmpParamBare;
};
let { a: a } = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 1, b: 2 };
    p = $(tmpCalleeParam);
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
$( a );
$( undefined );
$( 999 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: undefined
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
