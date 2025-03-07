# Preval test case

# base_method.md

> Tofix > base method
>
> If a function returns a static mutation to a param value we can outline the param and drop it

existing test

we can totally resolve the .toString here. why dont we?

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x.toString();
  return y;
}

$(f([1, 2, 3]));
$(f(300));
$(f('three'));
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
$([1, 2, 3].toString());
f();
$(`300`);
f();
$(`three`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x.toString();
  return y;
};
$(f([1, 2, 3]));
$(f(300));
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
  const y = x.toString();
  return y;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCalleeParam$3 = f(300);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(`three`);
$(tmpCalleeParam$5);
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
const tmpCalleeParam$1 /*:array*/ = [1, 2, 3];
const tmpCalleeParam /*:string*/ = tmpCalleeParam$1.toString();
$(tmpCalleeParam);
f();
$(`300`);
f();
$(`three`);
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
const b = [ 1, 2, 3 ];
const c = b.toString();
$( c );
a();
$( "300" );
a();
$( "three" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: '1,2,3'
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: '300'
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $array_toString