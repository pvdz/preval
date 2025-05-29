# Preval test case

# base.md

> Self assign closure > Self assign noop > Base
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
> f();
> ```
>
> We will also support an alias check. If the function is assigned to another binding, we check
> this binding to confirm that it is only ever used as a function call.

## Input

`````js filename=intro
var a = function() {
  a = function(){
    $('inner');
  };
  return a();
}
a();
`````


## Settled


`````js filename=intro
$(`inner`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`inner`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "inner" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
a = function () {
  debugger;
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


- (todo) Found a self-closing function shell but it did not match a known pattern...


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'inner'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
