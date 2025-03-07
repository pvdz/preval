# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let { a } = { a: 999, b: 1000 };
    $({ a: 1, b: 2 });
    $(a);
  }
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1, b: 2 };
$(tmpCalleeParam);
$(999);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ a: 1, b: 2 });
$(999);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let { a: a } = { a: 999, b: 1000 };
    $({ a: 1, b: 2 });
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let bindingPatternObjRoot = { a: 999, b: 1000 };
  let a = bindingPatternObjRoot.a;
  const tmpCalleeParam = { a: 1, b: 2 };
  $(tmpCalleeParam);
  $(a);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
$( a );
$( 999 );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
