# Preval test case

# base_call.md

> Locking > Base call
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
function f(a, b, c) {
  $('call me once', this, a, b, c);
}
function g() {
  let x = f;
  if (f) {
    const obj = {}
    f.call(obj, 1, 2, 3);
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
  if (f) {
    const obj = {};
    f.call(obj, 1, 2, 3);
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
  if (f) {
    const obj = {};
    f.call(obj, 1, 2, 3);
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
const tmpFuncLock = function ($$0, $$1, $$2) {
  const tmpPrevalAliasThis = this;
  const a = $$0;
  const b = $$1;
  const c = $$2;
  debugger;
  $(`call me once`, tmpPrevalAliasThis, a, b, c);
  return undefined;
};
let f = true;
const g = function () {
  debugger;
  if (f) {
    const obj = {};
    tmpFuncLock.call(obj, 1, 2, 3);
    f = false;
    return undefined;
  } else {
    return undefined;
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
const a = function($$0,$$1,$$2 ) {
  const b = this;
  const c = d;
  const e = f;
  const g = h;
  debugger;
  $( "call me once", b, c, e, g );
  return undefined;
};
let i = true;
const j = function() {
  debugger;
  if (i) {
    const k = {};
    a.call( k, 1, 2, 3 );
    i = false;
    return undefined;
  }
  else {
    return undefined;
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
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
