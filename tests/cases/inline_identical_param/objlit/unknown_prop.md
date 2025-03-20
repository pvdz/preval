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
