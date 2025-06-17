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
const f /*:()=>unknown*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = tmpPrevalAliasThis.x;
  return tmpClusterSSA_tmpReturnArg$1;
};
const tmpMCP /*:object*/ /*truthy*/ = { x: 100 };
const tmpCalleeParam /*:unknown*/ /*truthy*/ = $dotCall($function_call, f, `call`, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpClusterSSA_tmpReturnArg$1 = this.x;
  return tmpClusterSSA_tmpReturnArg$1;
};
$($dotCall($function_call, f, `call`, { x: 100 }));
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
const e = $dotCall( $function_call, a, "call", d );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

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
const tmpMCF = f.call;
const tmpMCP = { x: 100 };
let tmpCalleeParam = $dotCall(tmpMCF, f, `call`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call
- (todo) this may support .call .apply and .bind but I think that different reducers should tackle it


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
