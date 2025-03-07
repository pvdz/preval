# Preval test case

# func_nested.md

> Normalize > Nullish > Func nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj??a??b);
}
$(f());
`````

## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:unknown*/ = $();
const tmpObjLitVal /*:object*/ = { b: tmpObjLitVal$1 };
const obj /*:object*/ = { a: tmpObjLitVal };
const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(obj);
$(tmpClusterSSA_tmpReturnArg$1);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
$($({ a: tmpObjLitVal }));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: $() } };
  return $(obj ?? a ?? b);
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
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = a;
  } else {
  }
  const tmpIfTest$1 = tmpCalleeParam == null;
  if (tmpIfTest$1) {
    tmpCalleeParam = b;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = { b: a };
const c = { a: b };
const d = $( c );
$( d );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"undefined"}' }
 - 3: { a: '{"b":"undefined"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
