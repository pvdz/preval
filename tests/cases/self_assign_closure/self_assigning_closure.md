# Preval test case

# self_assigning_closure.md

> Self assign closure > Self assigning closure
>
> Targets a specific obfuscation trick where the function creates a closure and assigns it to its own variable.
> ```
> let f = function(){
>   const arr = [1, 2, 3];
>   f = function(){ return arr }
>   return f();
> }
> f();
> f();
> ```
> 
> Any calls to f(); will invariably return the same closure reference to arr.
> As long as there are no observable side effects in the function that might mutate f or arr, we should be able
> to safely change it to something like this:
> 
> ```
> const arr = [1, 2, 3];
> let f;
> f = function(){
>   return arr;
> };
> arr;
> f = function(){
>   return arr;
> };
> arr;
> ```
> 
> And in many cases those assignments are not going to be read and can be eliminated.

## Input

`````js filename=intro
let f = function() {
  const arr = [1, 2, 3];
  f = function() {
    return arr;
  };
  return f();
}
$(f());
$(f());
`````


## Settled


`````js filename=intro
const f /*:array*/ = [1, 2, 3];
$(f);
$(f);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = [1, 2, 3];
$(f);
$(f);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
