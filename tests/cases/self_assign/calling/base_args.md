# Preval test case

# base_args.md

> Self assign > Calling > Base args
>
> This is targeting a specific trick used by certain obfuscators.
> The pattern will create a function, then reassign a new function to that same binding. In this 
> particular case, the new function has no closures and the only discernible difference is its 
> instance reference. So as long as the function is only ever called, it should be perfectly safe
> to replace the outer function body with that of the inner (plus patch the header).
>  
> ```
> let f = function(a,b,c) {
>   g();                    // calling some func
>   f = function(d,e,f){
>     $();
>   };
>   return a(a,b,c);
> }
> f();
> ```
>
> We will also support an alias check. If the function is assigned to another binding, we check
> this binding to confirm that it is only ever used as a function call.

## Input

`````js filename=intro
// SHOULD transform
var f = function(a,b,c) {
  $('call me');
  f = function(d,e,f){
    $('inner',d,e,f);
  };
  return f(a,b,c);
}
f(1,2,3);
`````


## Settled


`````js filename=intro
$(`call me`);
$(`inner`, 1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`call me`);
$(`inner`, 1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "call me" );
$( "inner", 1, 2, 3 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = undefined;
f = function ($$0, $$1, $$2) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  debugger;
  $(`call me`);
  f = function ($$0, $$1, $$2) {
    let d = $$0;
    let e = $$1;
    let f$1 = $$2;
    debugger;
    $(`inner`, d, e, f$1);
    return undefined;
  };
  const tmpReturnArg = f(a, b, c);
  return tmpReturnArg;
};
f(1, 2, 3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'call me'
 - 2: 'inner', 1, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
