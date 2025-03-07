# Preval test case

# arrow_this.md

> Normalize > Arrow > Arrow this
>
> Basic case of this wrapping


```js
function f() {
  const that = this;
  const g = function(){
    return that.x;
  }

  return g();
}
$(f.call({x: 100}));
```

## Input

`````js filename=intro
function f() {
  const g = () => this.x;
  
  return g();
}
$(f.call({x: 100}));
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  const tmpReturnArg /*:unknown*/ = tmpPrevalAliasThis.x;
  return tmpReturnArg;
};
const tmpCalleeParam$1 /*:object*/ = { x: 100 };
const tmpCalleeParam /*:unknown*/ = f.call(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpReturnArg = this.x;
  return tmpReturnArg;
};
$(f.call({ x: 100 }));
`````

## Pre Normal


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const g = () => {
    debugger;
    return tmpPrevalAliasThis.x;
  };
  return g();
};
$(f.call({ x: 100 }));
`````

## Normalized


`````js filename=intro
let f = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  const g = function () {
    debugger;
    const tmpReturnArg = tmpPrevalAliasThis.x;
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
const tmpCallObj = f;
const tmpCallVal = tmpCallObj.call;
const tmpCalleeParam$1 = { x: 100 };
const tmpCalleeParam = $dotCall(tmpCallVal, tmpCallObj, `call`, tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  const c = b.x;
  return c;
};
const d = { x: 100 };
const e = a.call( d );
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
