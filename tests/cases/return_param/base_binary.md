# Preval test case

# base_binary.md

> Return param > Base binary
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x | 5;
  return y;
}

$(f(1));
$(f(2));
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
$(5);
f();
$(7);
f();
$(5);
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
$(5);
f();
$(7);
f();
$(5);
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
$( 5 );
a();
$( 7 );
a();
$( 5 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 5
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: 7
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
