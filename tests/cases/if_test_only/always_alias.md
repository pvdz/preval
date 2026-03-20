# Preval test case

# always_alias.md

> If test only > Always alias
>
> A sealer that is always a const alias

## Input

`````js filename=intro
const proxy = function() {
  $(`spy`);
};
let proxyMaybe = undefined; // if falsy it is aliased, if truthy it is alias
const f = function() {
  if (proxyMaybe) {
    const tmpClusterSSA_t = proxyMaybe(); // <- must be proxy, always
    return tmpClusterSSA_t;
  } else {
    proxyMaybe = proxy;
    $(`spy`); // <-- already unwrapped
  }
};
$(f);
const tmp = f();
$(tmp);
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`spy`);
  return undefined;
};
$(f);
$(`spy`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  $(`spy`);
});
$(`spy`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "spy" );
  return undefined;
};
$( a );
$( "spy" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const proxy = function () {
  debugger;
  $(`spy`);
  return undefined;
};
let proxyMaybe = undefined;
const f = function () {
  debugger;
  if (proxyMaybe) {
    const tmpClusterSSA_t = proxyMaybe();
    return tmpClusterSSA_t;
  } else {
    proxyMaybe = proxy;
    $(`spy`);
    return undefined;
  }
};
$(f);
const tmp = f();
$(tmp);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 'spy'
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
