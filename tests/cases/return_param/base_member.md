# Preval test case

# base_member.md

> Return param > Base member
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x.length;
  return y;
}

$(f([1, 2, 3]));
$(f($));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(3);
f();
const tmpCalleeParam$3 /*:unknown*/ = $.length;
$(tmpCalleeParam$3);
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
$(3);
f();
$($.length);
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
$( 3 );
a();
const b = $.length;
$( b );
a();
$( 5 );
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
 - 4: 3
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: 0
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 5
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
