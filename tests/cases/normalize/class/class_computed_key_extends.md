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
const tmpClassSuper$1 /*:unknown*/ = $($string_constructor);
const tmpClassComputedKey /*:unknown*/ = $(`f`);
const x /*:class*/ /*truthy*/ = class extends tmpClassSuper$1 {
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
const tmpMCOO /*:object*/ /*truthy*/ = new x();
const tmpMCF /*:unknown*/ = tmpMCOO.f;
const tmpCalleeParam /*:unknown*/ = $dotCall(tmpMCF, tmpMCOO, `f`);
$(tmpCalleeParam);
const tmpMCOO$1 /*:object*/ /*truthy*/ = new x();
const tmpMCF$1 /*:unknown*/ = tmpMCOO$1.g;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, tmpMCOO$1, `g`);
$(tmpCalleeParam$1);
const tmpMCOO$3 /*:object*/ /*truthy*/ = new x();
const tmpMCF$3 /*:unknown*/ = tmpMCOO$3.x;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$3, tmpMCOO$3, `x`);
$(tmpCalleeParam$3);
const tmpMCOO$5 /*:object*/ /*truthy*/ = new x();
const tmpMCF$5 /*:unknown*/ = tmpMCOO$5.y;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$5, tmpMCOO$5, `y`);
$(tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClassSuper$1 = $($string_constructor);
const tmpClassComputedKey = $(`f`);
const x = class extends tmpClassSuper$1 {
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
const tmpMCOO = new x();
$(tmpMCOO.f());
const tmpMCOO$1 = new x();
$(tmpMCOO$1.g());
const tmpMCOO$3 = new x();
$(tmpMCOO$3.x());
const tmpMCOO$5 = new x();
$(tmpMCOO$5.y());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( $string_constructor );
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let s = String;
const y = `y`;
const tmpClassSuper = $(s);
const tmpClassSuper$1 = tmpClassSuper;
const tmpClassComputedKey = $(`f`);
s = $number_constructor;
const tmpClassComputedKey$1 = `x`;
let x = class extends tmpClassSuper$1 {
  [tmpClassComputedKey]() {
    debugger;
    const tmpReturnArg = $(100, `method`);
    return tmpReturnArg;
  }
  g() {
    debugger;
    const tmpReturnArg$1 = $(200, `method`);
    return tmpReturnArg$1;
  }
  [tmpClassComputedKey$1]() {
    debugger;
    const tmpReturnArg$3 = $(300, `method`);
    return tmpReturnArg$3;
  }
  [y]() {
    debugger;
    const tmpReturnArg$5 = $(400, `method`);
    return tmpReturnArg$5;
  }
};
const tmpMCOO = new x();
const tmpMCF = tmpMCOO.f;
let tmpCalleeParam = $dotCall(tmpMCF, tmpMCOO, `f`);
$(tmpCalleeParam);
const tmpMCOO$1 = new x();
const tmpMCF$1 = tmpMCOO$1.g;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, tmpMCOO$1, `g`);
$(tmpCalleeParam$1);
const tmpMCOO$3 = new x();
const tmpMCF$3 = tmpMCOO$3.x;
let tmpCalleeParam$3 = $dotCall(tmpMCF$3, tmpMCOO$3, `x`);
$(tmpCalleeParam$3);
const tmpMCOO$5 = new x();
const tmpMCF$5 = tmpMCOO$5.y;
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, tmpMCOO$5, `y`);
$(tmpCalleeParam$5);
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
