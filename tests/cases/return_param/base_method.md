# Preval test case

# base_method.md

> Return param > Base method
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x.toString();
  return y;
}

$(f([1, 2, 3]));
$(f(300));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(`1,2,3`);
f();
$(`300`);
f();
$(`three`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`no`);
  $(`inlining`);
  $(`please`);
};
f();
$(`1,2,3`);
f();
$(`300`);
f();
$(`three`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  return undefined;
};
a();
$( "1,2,3" );
a();
$( "300" );
a();
$( "three" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: '1,2,3'
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: '300'
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
