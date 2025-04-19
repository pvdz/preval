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
const tmpCalleeParam /*:unknown*/ = $dotCall($function_call, f, `call`, tmpCalleeParam$1);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpReturnArg = this.x;
  return tmpReturnArg;
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


## Todos triggered


- (todo) access object property that also exists on prototype? $function_call


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
