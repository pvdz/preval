# Preval test case

# base_call_early.md

> Locking > Base call early
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
function f(a, b, c) {
  $('call me once', this, a, b, c);
}
function g() {
  let x = f;
  const obj = {}
  f.call(obj, 1, 2, 3); // This should crash after the first call
  if (f) {
    f = false;
  }
}
$(g());
$(g());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  $(`call me once`, tmpPrevalAliasThis, a, b, c);
};
let g = function () {
  debugger;
  let x = f;
  const obj = {};
  f.call(obj, 1, 2, 3);
  if (f) {
    f = false;
  }
};
$(g());
$(g());
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  $(`call me once`, tmpPrevalAliasThis, a, b, c);
  return undefined;
};
let g = function () {
  debugger;
  let x = f;
  const obj = {};
  f.call(obj, 1, 2, 3);
  if (f) {
    f = false;
    return undefined;
  } else {
    return undefined;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = g();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = g();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
let tmpFuncLock = true;
const f = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  const a = $$0;
  const b = $$1;
  const c = $$2;
  debugger;
  $(`call me once`, tmpPrevalAliasThis, a, b, c);
  return undefined;
};
const g = function () {
  debugger;
  if (tmpFuncLock) {
    const obj = {};
    f.call(obj, 1, 2, 3);
    tmpFuncLock = false;
    return undefined;
  } else {
    throw `Preval: cannot call a locked function (binding overwritten with non-func)`;
  }
};
g();
$(undefined);
g();
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = function($$0,$$1,$$2 ) {
  const c = this;
  const d = e;
  const f = g;
  const h = i;
  debugger;
  $( "call me once", c, d, f, h );
  return undefined;
};
const j = function() {
  debugger;
  if (a) {
    const k = {};
    b.call( k, 1, 2, 3 );
    a = false;
    return undefined;
  }
  else {
    throw "Preval: cannot call a locked function (binding overwritten with non-func)";
  }
};
j();
$( undefined );
j();
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'call me once', {}, 1, 2, 3
 - 2: undefined
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
