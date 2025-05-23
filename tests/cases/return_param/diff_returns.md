# Preval test case

# diff_returns.md

> Return param > Diff returns
>
> If a function returns a static mutation to a param value we can outline the param and drop it

In this case it returns multiple values so the trick does not apply (unless other tricks enable it).

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
    return 5;
  }
}

$(f(1));
$(f(2));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:(primitive)=>number*/ = function ($$0) {
  const x /*:primitive*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(`a`);
    const y /*:number*/ = ~x;
    return y;
  } else {
    $(`b`);
    return 5;
  }
};
const tmpCalleeParam /*:number*/ = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:number*/ = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:number*/ = f(`three`);
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $(`no`);
  $(`inlining`);
  $(`please`);
  if ($(true)) {
    $(`a`);
    const y = ~x;
    return y;
  } else {
    $(`b`);
    return 5;
  }
};
$(f(1));
$(f(2));
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
  const c = $( true );
  if (c) {
    $( "a" );
    const d = ~b;
    return d;
  }
  else {
    $( "b" );
    return 5;
  }
};
const e = a( 1 );
$( e );
const f = a( 2 );
$( f );
const g = a( "three" );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return 5;
  }
};
let tmpCalleeParam = f(1);
$(tmpCalleeParam);
let tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = f(`three`);
$(tmpCalleeParam$3);
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
