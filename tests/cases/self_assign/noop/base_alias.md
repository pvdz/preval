# Preval test case

# base_alias.md

> Self assign > Noop > Base alias
>
> This is targeting a specific trick used by certain obfuscators.
> The pattern will create a function, then reassign a new function to that same binding. In this 
> particular case, the new function has no closures and the only discernible difference is its 
> instance reference. So as long as the function is only ever called, it should be perfectly safe
> to replace the outer function body with that of the inner (plus patch the header).
>  
> ```
> let f = function() {
>   f = function(){
>     $();
>   };
>   return a();
> }
> const g = f;
> f();
> g();
> ```
>
> We will also support an alias check. If the function is assigned to another binding, we check
> this binding to confirm that it is only ever used as a function call.

## Input

`````js filename=intro
// Should NOT inline because preval can't determine whether g gets called (at all and) before calling f
var f = function() {
  f = function(){
    $('inner');
  };
  return f();
}
function h() {
    const g = f;
    f();
    g();
}
$(h);
`````


## Settled


`````js filename=intro
let f /*:()=>unknown*/ = function () {
  debugger;
  f = function () {
    debugger;
    $(`inner`);
    return undefined;
  };
  const tmpReturnArg /*:unknown*/ = f();
  return tmpReturnArg;
};
const h /*:()=>undefined*/ = function () {
  debugger;
  const g /*:unknown*/ = f;
  f();
  g();
  return undefined;
};
$(h);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let f = function () {
  f = function () {
    $(`inner`);
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
$(function () {
  const g = f;
  f();
  g();
});
`````


## PST Settled
With rename=true

`````js filename=intro
let a = function() {
  debugger;
  a = function() {
    debugger;
    $( "inner" );
    return undefined;
  };
  const b = a();
  return b;
};
const c = function() {
  debugger;
  const d = a;
  a();
  d();
  return undefined;
};
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = undefined;
let h = function () {
  debugger;
  const g = f;
  f();
  g();
  return undefined;
};
f = function () {
  debugger;
  f = function () {
    debugger;
    $(`inner`);
    return undefined;
  };
  const tmpReturnArg = f();
  return tmpReturnArg;
};
$(h);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
