# Preval test case

# base.md

> Self assign > Calling > Base
>
> This is targeting a specific trick used by certain obfuscators.
> The pattern will create a function, then reassign a new function to that same binding. In this 
> particular case, the new function has no closures and the only discernible difference is its 
> instance reference. So as long as the function is only ever called, it should be perfectly safe
> to replace the outer function body with that of the inner (plus patch the header).
>  
> ```
> let f = function() {
>   g();                    // calling some func
>   f = function(){
>     $();
>   };
>   return a();
> }
> f();
> ```
>
> We will also support an alias check. If the function is assigned to another binding, we check
> this binding to confirm that it is only ever used as a function call.

## Input

`````js filename=intro
var a = function() {
  $('call me');
  a = function(){
    $('inner');
  };
  return a();
}
a();
`````


## Settled


`````js filename=intro
$(`call me`);
$(`inner`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`call me`);
$(`inner`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "call me" );
$( "inner" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
a = function () {
  debugger;
  $(`call me`);
  a = function () {
    debugger;
    $(`inner`);
    return undefined;
  };
  const tmpReturnArg = a();
  return tmpReturnArg;
};
a();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'call me'
 - 2: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
