# Preval test case

# longer.md

> If test only > Longer
>
> More complex case

Point is that we know that when the code would call aliasMaybe, we should be able to know that it is set regardless.
If we do then we may as well alias it immediately since there is no other observation of that fact, provided the aliased function is a constant.
First step is to eliminate the sealer and replace that with the proxyMaybe itself

## Input

`````js filename=intro
const proxy = function(){ $('spy'); };
let sealed = false;
let proxyMaybe = undefined;
const f = function() {
  if (!sealed) {
    proxyMaybe = proxy;
    sealed = true;
  }
  const t = proxyMaybe();
  return t;
};
$(f); // dont collapse entirely (it would, otherwise)
$(f());
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
let sealed = false;
let proxyMaybe = undefined;
const f = function () {
  debugger;
  if (sealed) {
  } else {
    proxyMaybe = proxy;
    sealed = true;
  }
  const t = proxyMaybe();
  return t;
};
$(f);
let tmpCalleeParam = f();
$(tmpCalleeParam);
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
