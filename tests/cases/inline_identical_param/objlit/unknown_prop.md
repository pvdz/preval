# Preval test case

# unknown_prop.md

> Inline identical param > Objlit > Unknown prop
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj.a);
  $(obj.b); // Note: neither object has a b property... this will return Object.prototype.b
}

f({a: 1});
f({a: 3});
`````

## Settled


`````js filename=intro
const f /*:(number)=>undefined*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  $(a);
  const tmpCalleeParam$1 /*:unknown*/ = $Object_prototype.b;
  $(tmpCalleeParam$1);
  return undefined;
};
f(1);
f(3);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (a) {
  $(a);
  $($Object_prototype.b);
};
f(1);
f(3);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj.a);
  $(obj.b);
};
f({ a: 1 });
f({ a: 3 });
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  const tmpCalleeParam = obj.a;
  $(tmpCalleeParam);
  const tmpCalleeParam$1 = obj.b;
  $(tmpCalleeParam$1);
  return undefined;
};
const tmpCallCallee = f;
const tmpCalleeParam$3 = { a: 1 };
tmpCallCallee(tmpCalleeParam$3);
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = { a: 3 };
tmpCallCallee$1(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( b );
  const c = $Object_prototype.b;
  $( c );
  return undefined;
};
a( 1 );
a( 3 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
