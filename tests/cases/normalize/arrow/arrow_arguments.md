# Preval test case

# arrow_arguments.md

> Normalize > Arrow > Arrow arguments
>
> Basic case of this wrapping


```js
function f() {
  const args = arguments;
  const g = function(){
    return args[0];
  }

  return g();
}
$(f(1));
```

## Input

`````js filename=intro
function f() {
  const g = () => arguments[0];
  
  return g();
}
$(f(100));
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  debugger;
  const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  return tmpClusterSSA_tmpReturnArg$1;
};
const tmpCalleeParam /*:unknown*/ = f(100);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const tmpClusterSSA_tmpReturnArg$1 = arguments[0];
  return tmpClusterSSA_tmpReturnArg$1;
};
$(f(100));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = c;
  debugger;
  const d = b[ 0 ];
  return d;
};
const e = a( 100 );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  const tmpPrevalAliasArgumentsAny = arguments;
  debugger;
  const g = function () {
    debugger;
    const tmpReturnArg = tmpPrevalAliasArgumentsAny[0];
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
let tmpCalleeParam = f(100);
$(tmpCalleeParam);
`````


## Todos triggered


None


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
