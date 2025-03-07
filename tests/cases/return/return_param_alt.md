# Preval test case

# return_param_alt.md

> Return > Return param alt
>
> A function that returns an alteration of its param

## Input

`````js filename=intro
function f(a) {
  $('stop');
  $('the');
  $('inlining');
  return a | 16;
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
$(17);
f();
$(18);
f();
$(16);
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
$(17);
f();
$(18);
f();
$(16);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  return a | 16;
};
$(f(1));
$(f(2));
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  $(`stop`);
  $(`the`);
  $(`inlining`);
  const tmpReturnArg = a | 16;
  return tmpReturnArg;
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
  $( "stop" );
  $( "the" );
  $( "inlining" );
  return undefined;
};
a();
$( 17 );
a();
$( 18 );
a();
$( 16 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'stop'
 - 2: 'the'
 - 3: 'inlining'
 - 4: 17
 - 5: 'stop'
 - 6: 'the'
 - 7: 'inlining'
 - 8: 18
 - 9: 'stop'
 - 10: 'the'
 - 11: 'inlining'
 - 12: 16
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
