# Preval test case

# non-call.md

> Return param > Non-call
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Returns an implicit global. Can't deal with it.

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
$(f.length); // This prevents the trick
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>number*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y /*:number*/ = ~x;
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
const tmpCalleeParam /*:number*/ = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = f.length;
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:number*/ = f(`three`);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  if ($(true)) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
$(f(1));
$(f(2));
$(f.length);
$(f(`three`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  const c = ~b;
  const d = $( true );
  if (d) {
    $( "a" );
    return c;
  }
  else {
    $( "b" );
    return c;
  }
};
const e = a( 1 );
$( e );
const f = a( 2 );
$( f );
const g = a.length;
$( g );
const h = a( "three" );
$( h );
`````


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
 - 13: 1
 - 14: 'no'
 - 15: 'inlining'
 - 16: 'please'
 - 17: true
 - 18: 'a'
 - 19: -1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
