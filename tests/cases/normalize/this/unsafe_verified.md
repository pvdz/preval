# Preval test case

# unsafe_verified.md

> Normalize > This > Unsafe verified
>
> A constant set to null should be eliminated

Note: in strict mode this in global is gonna be bad.

## Input

`````js filename=intro
function f() {
  const x = this;
  $(x);
  function g() {
     $(x);
     return x.y; // The x should not be inlined
  }
  return g();
}
$(f.call({y: 1}));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    $(x);
    return x.y;
  };
  const x = tmpPrevalAliasThis;
  $(x);
  return g();
};
$(f.call({ y: 1 }));
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  let g = function () {
    debugger;
    $(x);
    const tmpReturnArg = x.y;
    return tmpReturnArg;
  };
  const x = tmpPrevalAliasThis;
  $(x);
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam$1 = { y: 1 };
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, `call`, tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  $(tmpPrevalAliasThis);
  $(tmpPrevalAliasThis);
  const tmpReturnArg /*:unknown*/ = tmpPrevalAliasThis.y;
  return tmpReturnArg;
};
const tmpCalleeParam$1 /*:object*/ = { y: 1 };
const tmpCalleeParam /*:unknown*/ = f.call(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  $( b );
  $( b );
  const c = b.y;
  return c;
};
const d = { y: 1 };
const e = a.call( d );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: { y: '1' }
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
