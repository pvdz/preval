# Preval test case

# multi_use_a.md

> Return param > Multi use a
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Make sure it works when the same ident is returned multiple times.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  if ($(true)) {
    $('a');
    return y;
  } else {
    $('b');
    return y;
  }
}

$(f(1));
$(f(2));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(`a`);
    return undefined;
  } else {
    $(`b`);
    return undefined;
  }
};
f();
$(-2);
f();
$(-3);
f();
$(-1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`no`);
  $(`inlining`);
  $(`please`);
  if ($(true)) {
    $(`a`);
  } else {
    $(`b`);
  }
};
f();
$(-2);
f();
$(-3);
f();
$(-1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  const b = $( true );
  if (b) {
    $( "a" );
    return undefined;
  }
  else {
    $( "b" );
    return undefined;
  }
};
a();
$( -2 );
a();
$( -3 );
a();
$( -1 );
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
 - 4: true
 - 5: 'a'
 - 6: -2
 - 7: 'no'
 - 8: 'inlining'
 - 9: 'please'
 - 10: true
 - 11: 'a'
 - 12: -3
 - 13: 'no'
 - 14: 'inlining'
 - 15: 'please'
 - 16: true
 - 17: 'a'
 - 18: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
