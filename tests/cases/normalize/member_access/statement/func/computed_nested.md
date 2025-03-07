# Preval test case

# computed_nested.md

> Normalize > Member access > Statement > Func > Computed nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj['a'].b;
}
$(f());
`````

## Settled


`````js filename=intro
$();
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: $() } };
  obj[`a`].b;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCompObj = obj.a;
  tmpCompObj.b;
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$();
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
