# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Return > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
function f() {
  return $({ a: 1, b: 2 });
}
$(f());
$(a);
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
const tmpReturnArg /*:unknown*/ = $(tmpCalleeParam);
$(tmpReturnArg);
$(999);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($({ a: 1, b: 2 }));
$(999);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $({ a: 1, b: 2 });
};
let { a: a } = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpCalleeParam = { a: 1, b: 2 };
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
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
const b = $( a );
$( b );
$( 999 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
