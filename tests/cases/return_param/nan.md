# Preval test case

# nan.md

> Return param > Nan
>
> If a function returns a static mutation to a param value we can outline the param and drop it

Returns a builtin

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = ~x;
  if ($(true)) {
    $('a');
    return NaN;
  } else {
    $('b');
    return NaN;
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
$(NaN);
f();
$(NaN);
f();
$(NaN);
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
$(NaN);
f();
$(NaN);
f();
$(NaN);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = ~x;
  if ($(true)) {
    $(`a`);
    return NaN;
  } else {
    $(`b`);
    return NaN;
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
  const y = ~x;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    $(`a`);
    return NaN;
  } else {
    $(`b`);
    return NaN;
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
$( NaN );
a();
$( NaN );
a();
$( NaN );
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
 - 6: NaN
 - 7: 'no'
 - 8: 'inlining'
 - 9: 'please'
 - 10: true
 - 11: 'a'
 - 12: NaN
 - 13: 'no'
 - 14: 'inlining'
 - 15: 'please'
 - 16: true
 - 17: 'a'
 - 18: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
