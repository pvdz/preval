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
const tmpCalleeParam /*:unknown*/ = tmpCallObj.f();
$(tmpCalleeParam);
const tmpCallObj$1 /*:object*/ = new x();
const tmpCalleeParam$1 /*:unknown*/ = tmpCallObj$1.g();
$(tmpCalleeParam$1);
const tmpCallObj$3 /*:object*/ = new x();
const tmpCalleeParam$3 /*:unknown*/ = tmpCallObj$3.x();
$(tmpCalleeParam$3);
const tmpCallObj$5 /*:object*/ = new x();
const tmpCalleeParam$5 /*:unknown*/ = tmpCallObj$5.y();
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
$(new x().f());
$(new x().g());
$(new x().x());
$(new x().y());
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
const i = h.f();
$( i );
const j = new c();
const k = j.g();
$( k );
const l = new c();
const m = l.x();
$( m );
const n = new c();
const o = n.y();
$( o );
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
