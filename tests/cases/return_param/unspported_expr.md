# Preval test case

# unspported_expr.md

> Return param > Unspported expr
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Returns an implicit global. Can't deal with it.

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x + $(1); // This will break the "static expression" clause and prevent the trick
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
const f /*:(primitive)=>primitive*/ = function ($$0) {
  const x /*:primitive*/ = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpBinBothRhs /*:unknown*/ = $(1);
  const y /*:primitive*/ = x + tmpBinBothRhs;
  const tmpIfTest /*:unknown*/ = $(true);
  if (tmpIfTest) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
const tmpCalleeParam /*:primitive*/ = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:primitive*/ = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:primitive*/ = f(`three`);
$(tmpCalleeParam$3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x + $(1);
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
$(f(`three`));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x + $(1);
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
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const tmpBinBothLhs = x;
  const tmpBinBothRhs = $(1);
  const y = tmpBinBothLhs + tmpBinBothRhs;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`a`);
    return y;
  } else {
    $(`b`);
    return y;
  }
};
const tmpCalleeParam = f(1);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(2);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(`three`);
$(tmpCalleeParam$3);
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
  const c = $( 1 );
  const d = b + c;
  const e = $( true );
  if (e) {
    $( "a" );
    return d;
  }
  else {
    $( "b" );
    return d;
  }
};
const f = a( 1 );
$( f );
const g = a( 2 );
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
 - 4: 1
 - 5: true
 - 6: 'a'
 - 7: 2
 - 8: 'no'
 - 9: 'inlining'
 - 10: 'please'
 - 11: 1
 - 12: true
 - 13: 'a'
 - 14: 3
 - 15: 'no'
 - 16: 'inlining'
 - 17: 'please'
 - 18: 1
 - 19: true
 - 20: 'a'
 - 21: 'three1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
