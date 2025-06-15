# Preval test case

# base_method.md

> Tofix > base method
>
> If a function returns a static mutation to a param value we can outline the param and drop it

existing test

we can totally resolve the .toString here. why dont we?

- if a function does not use arguments
- if the first use of a param in a function reads a prop
- if the function doesnt escape
- if target param type is known for all calls to function
- if the prop resolves to a builtin function in all cases
- then we could add a new param to the function where we pass in the builtin function as an extra param instead

Result would be something like this:
```
const f /*:(unknown)=>unknown*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$('1,2,3');
f();
$('300');
f();
$('three');
```
or
```
  $(`no`);
  $(`inlining`);
  $(`please`);
$('1,2,3');
  $(`no`);
  $(`inlining`);
  $(`please`);
$('300');
  $(`no`);
  $(`inlining`);
  $(`please`);
$('three');
```

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


## Settled


`````js filename=intro
const f /*:(unknown)=>unknown*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$('1,2,3');
f();
$('300');
f();
$('three');
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
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


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  const c = b.toString;
  const d = $dotCall( c, b, "toString" );
  return d;
};
const e = [ 1, 2, 3 ];
const f = a( e );
$( f );
const g = a( 300 );
$( g );
const h = a( "three" );
$( h );
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
  const tmpMCF = x.toString;
  const y = $dotCall(tmpMCF, x, `toString`);
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = [1, 2, 3];
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
let tmpCalleeParam$3 = f(300);
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = f(`three`);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


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
