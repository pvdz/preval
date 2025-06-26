# Preval test case

# base_out.md

> Self assign > Base out
>
> What happens when we feed it the expected output immediately
> 
> This is targeting a specific trick used by certain obfuscators.
> The pattern will create a function, then assign that function to an alias.
> First time the function is called it will update its own (original) reference with a new function.
>  
> This transform works when:
> - a is only assigned to inside a
> - a can not be called before the assignment to c
>
> ```
> let a = function a() {
> $();
> a = function b(){}
> $();
> }
> const c = a;
> c();
> ```
>
> Expected outcome something like this:
> ```
> const t = function a(){
> a = function b(){}
> }
> let a = t;
> const c = t;
> ```
> 
> This way we can, ultimately, safely assert what `t` is doing without worrying about the self-assignment of calling a.
> In this particular example (and the pattern in question), `t` can be replaced by `c`, and it can ignore the self-assignments.

## Input

`````js filename=intro
var b = function() {
  $('before');
  a = function(){
    $('replaced');
  }
  $('after');
}
var a = b;
var c = b;
a();
c();
a();
c();
`````


## Settled


`````js filename=intro
const b /*:()=>undefined*/ = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
    return undefined;
  };
  $(`after`);
  return undefined;
};
let a /*:function*/ /*truthy*/ = b;
b();
b();
a();
b();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = function () {
  $(`before`);
  a = function () {
    $(`replaced`);
  };
  $(`after`);
};
let a = b;
b();
b();
a();
b();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "before" );
  b = function() {
    debugger;
    $( "replaced" );
    return undefined;
  };
  $( "after" );
  return undefined;
};
let b = a;
a();
a();
b();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
b = function () {
  debugger;
  $(`before`);
  a = function () {
    debugger;
    $(`replaced`);
    return undefined;
  };
  $(`after`);
  return undefined;
};
a = b;
c = b;
a();
c();
a();
c();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before'
 - 2: 'after'
 - 3: 'before'
 - 4: 'after'
 - 5: 'replaced'
 - 6: 'before'
 - 7: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
