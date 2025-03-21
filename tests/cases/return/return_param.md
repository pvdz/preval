# Preval test case

# return_param.md

> Return > Return param
>
> A function that returns its param

## Input

`````js filename=intro
function f(a) {
  $('stop');
  $('the');
  $('inlining');
  return a;
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
$(1);
f();
$(2);
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
$(1);
f();
$(2);
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
$( 1 );
a();
$( 2 );
a();
$( "three" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'stop'
 - 2: 'the'
 - 3: 'inlining'
 - 4: 1
 - 5: 'stop'
 - 6: 'the'
 - 7: 'inlining'
 - 8: 2
 - 9: 'stop'
 - 10: 'the'
 - 11: 'inlining'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
