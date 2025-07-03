# Preval test case

# objlit_prop_vardecl_arr_spy.md

> Object literal > Objlit prop vardecl arr spy
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
// Custom iterable object that spies
const oops = {
  toString(){ $('toString') },
  valueOf(){ $('valueOf') },
  [Symbol.iterator]() {     // <- preval doesnt understand this (at the time of writing)
    $('iterator called, o.x=', o.x);
    return [1, 2, 3, 4, 5]();
  },
};

const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ = { x: tmpObjLitVal };
const f = [...oops];
const tmpCalleeParam$1 /*:unknown*/ = o.x; // <- cannot inline safely because f will spy
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Settled


`````js filename=intro
const tmpObjLitPropKey /*:unknown*/ = Symbol.iterator;
const oops /*:object*/ /*truthy*/ = {
  toString() {
    debugger;
    $(`toString`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return undefined;
  },
  [tmpObjLitPropKey]() {
    debugger;
    const tmpCalleeParam /*:unknown*/ = o.x;
    $(`iterator called, o.x=`, tmpCalleeParam);
    const tmpCallComplexCallee /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
    const tmpReturnArg /*:unknown*/ = tmpCallComplexCallee();
    return tmpReturnArg;
  },
};
const tmpObjLitVal /*:unknown*/ = $(1);
const o /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
const f /*:array*/ /*truthy*/ = [...oops];
const tmpCalleeParam$1 /*:unknown*/ = o.x;
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitPropKey = Symbol.iterator;
const oops = {
  toString() {
    $(`toString`);
  },
  valueOf() {
    $(`valueOf`);
  },
  [tmpObjLitPropKey]() {
    $(`iterator called, o.x=`, o.x);
    const tmpCallComplexCallee = [1, 2, 3, 4, 5];
    const tmpReturnArg = tmpCallComplexCallee();
    return tmpReturnArg;
  },
};
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const f = [...oops];
$(o.x);
o.x = 10;
f();
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Symbol.iterator;
const b = {
  toString(  ) {
    debugger;
    $( "toString" );
    return undefined;
  },
  valueOf(  ) {
    debugger;
    $( "valueOf" );
    return undefined;
  },
  [ a ](  ) {
    debugger;
    const c = d.x;
    $( "iterator called, o.x=", c );
    const e = [ 1, 2, 3, 4, 5 ];
    const f = e();
    return f;
  },,
};
const g = $( 1 );
const d = { x: g };
const h = [ ...b ];
const i = d.x;
$( i );
d.x = 10;
h();
h();
h();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitPropKey = Symbol.iterator;
const oops = {
  toString() {
    debugger;
    $(`toString`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`valueOf`);
    return undefined;
  },
  [tmpObjLitPropKey]() {
    debugger;
    let tmpCalleeParam = o.x;
    $(`iterator called, o.x=`, tmpCalleeParam);
    const tmpCallComplexCallee = [1, 2, 3, 4, 5];
    const tmpReturnArg = tmpCallComplexCallee();
    return tmpReturnArg;
  },
};
const tmpObjLitVal = $(1);
const o = { x: tmpObjLitVal };
const f = [...oops];
const tmpCalleeParam$1 = o.x;
$(tmpCalleeParam$1);
o.x = 10;
f();
f();
f();
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'iterator called, o.x=', 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
