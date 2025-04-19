# Preval test case

# class_computed_key_extends.md

> Normalize > Class > Class computed key extends
>
> Make sure the transform of computed key does not change something that can change the super class value

## Input

`````js filename=intro
let s = String;
const y = 'y';
class x extends $(s) {
  [$('f')](){
    return $(100, 'method');
  }
  g(){
    return $(200, 'method');
  }
  [(s = Number, 'x')](){
    return $(300, 'method');
  }
  [y](){
    return $(400, 'method');
  }
}

$(new x().f());
$(new x().g());
$(new x().x());
$(new x().y());
`````


## Settled


`````js filename=intro
const tmpClassSuper /*:unknown*/ = $(String);
const tmpClassComputedKey /*:unknown*/ = $(`f`);
const x /*:class*/ = class extends tmpClassSuper {
  [tmpClassComputedKey]() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(100, `method`);
    return tmpReturnArg;
  }
  g() {
    debugger;
    const tmpReturnArg$1 /*:unknown*/ = $(200, `method`);
    return tmpReturnArg$1;
  }
  x() {
    debugger;
    const tmpReturnArg$3 /*:unknown*/ = $(300, `method`);
    return tmpReturnArg$3;
  }
  y() {
    debugger;
    const tmpReturnArg$5 /*:unknown*/ = $(400, `method`);
    return tmpReturnArg$5;
  }
};
const tmpCallObj /*:object*/ = new x();
const tmpCallCompVal /*:unknown*/ = tmpCallObj.f;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpCallCompVal, tmpCallObj, `f`);
$(tmpCalleeParam);
const tmpCallObj$1 /*:object*/ = new x();
const tmpCallCompVal$1 /*:unknown*/ = tmpCallObj$1.g;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpCallCompVal$1, tmpCallObj$1, `g`);
$(tmpCalleeParam$1);
const tmpCallObj$3 /*:object*/ = new x();
const tmpCallCompVal$3 /*:unknown*/ = tmpCallObj$3.x;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpCallCompVal$3, tmpCallObj$3, `x`);
$(tmpCalleeParam$3);
const tmpCallObj$5 /*:object*/ = new x();
const tmpCallCompVal$5 /*:unknown*/ = tmpCallObj$5.y;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpCallCompVal$5, tmpCallObj$5, `y`);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClassSuper = $(String);
const tmpClassComputedKey = $(`f`);
const x = class extends tmpClassSuper {
  [tmpClassComputedKey]() {
    const tmpReturnArg = $(100, `method`);
    return tmpReturnArg;
  }
  g() {
    const tmpReturnArg$1 = $(200, `method`);
    return tmpReturnArg$1;
  }
  x() {
    const tmpReturnArg$3 = $(300, `method`);
    return tmpReturnArg$3;
  }
  y() {
    const tmpReturnArg$5 = $(400, `method`);
    return tmpReturnArg$5;
  }
};
const tmpCallObj = new x();
$(tmpCallObj.f());
const tmpCallObj$1 = new x();
$(tmpCallObj$1.g());
const tmpCallObj$3 = new x();
$(tmpCallObj$3.x());
const tmpCallObj$5 = new x();
$(tmpCallObj$5.y());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( String );
const b = $( "f" );
const c = class   {
[ b ](  ) {
  debugger;
  const d = $( 100, "method" );
  return d;
},g(  ) {
  debugger;
  const e = $( 200, "method" );
  return e;
},x(  ) {
  debugger;
  const f = $( 300, "method" );
  return f;
},y(  ) {
  debugger;
  const g = $( 400, "method" );
  return g;
}
};
const h = new c();
const i = h.f;
const j = $dotCall( i, h, "f" );
$( j );
const k = new c();
const l = k.g;
const m = $dotCall( l, k, "g" );
$( m );
const n = new c();
const o = n.x;
const p = $dotCall( o, n, "x" );
$( p );
const q = new c();
const r = q.y;
const s = $dotCall( r, q, "y" );
$( s );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: 'f'
 - 3: 100, 'method'
 - 4: 100
 - 5: 200, 'method'
 - 6: 200
 - 7: 300, 'method'
 - 8: 300
 - 9: 400, 'method'
 - 10: 400
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
