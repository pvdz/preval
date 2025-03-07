# Preval test case

# simple_computed_call.md

> Normalize > Member access > Statement > Func > Simple computed call
>
> Dynamic property access should be normalized like all the other things

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj[$('foo')];
}
$(f());
`````

## Settled


`````js filename=intro
const tmpCompProp /*:unknown*/ = $(`foo`);
const obj /*:object*/ = { foo: 10 };
obj[tmpCompProp];
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCompProp = $(`foo`);
({ foo: 10 }[tmpCompProp]);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const obj = { foo: 10 };
  obj[$(`foo`)];
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCompProp = $(`foo`);
  tmpCompObj[tmpCompProp];
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "foo" );
const b = { foo: 10 };
b[ a ];
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'foo'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
