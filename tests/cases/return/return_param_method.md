# Preval test case

# return_param_method.md

> Return > Return param method
>
> A function that returns an alteration of its param

## Input

`````js filename=intro
function f(a) {
  $('stop');
  $('the');
  $('inlining');
  return a.toString(2); // A lot trickier, at least in certain cases
}
$(f(1));
$(f(2));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  return undefined;
};
f();
$(`1`);
f();
$(`10`);
f();
$(`three`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`stop`);
  $(`the`);
  $(`inlining`);
};
f();
$(`1`);
f();
$(`10`);
f();
$(`three`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "stop" );
  $( "the" );
  $( "inlining" );
  return undefined;
};
a();
$( "1" );
a();
$( "10" );
a();
$( "three" );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'stop'
 - 2: 'the'
 - 3: 'inlining'
 - 4: '1'
 - 5: 'stop'
 - 6: 'the'
 - 7: 'inlining'
 - 8: '10'
 - 9: 'stop'
 - 10: 'the'
 - 11: 'inlining'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
