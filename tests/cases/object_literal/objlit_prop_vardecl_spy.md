# Preval test case

# objlit_prop_vardecl_spy.md

> Object literal > Objlit prop vardecl spy
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
// Custom iterable object that spies
const oops = {
  toString(){ $('tostring') },
  valueOf(){ $('tostring') },
  [Symbol.iterator]() {     // <- preval doesnt understand this (at the time of writing)
    $('iterator called, o.x=', o.x);
    return this.values[Symbol.iterator]();
  },
  values: [1, 2, 3, 4, 5],
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
const tmpObjLitVal$1 /*:array*/ /*truthy*/ = [1, 2, 3, 4, 5];
const oops /*:object*/ /*truthy*/ = {
  toString() {
    debugger;
    $(`tostring`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`tostring`);
    return undefined;
  },
  [tmpObjLitPropKey]() {
    const tmpPrevalAliasThis /*:unknown*/ = this;
    debugger;
    const tmpCalleeParam /*:unknown*/ = o.x;
    $(`iterator called, o.x=`, tmpCalleeParam);
    const tmpMCCO /*:unknown*/ = tmpPrevalAliasThis.values;
    const tmpMCCP /*:unknown*/ = Symbol.iterator;
    const tmpMCF /*:unknown*/ = tmpMCCO[tmpMCCP];
    const tmpReturnArg /*:unknown*/ = $dotCall(tmpMCF, tmpMCCO, undefined);
    return tmpReturnArg;
  },
  values: tmpObjLitVal$1,
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
const tmpObjLitVal$1 = [1, 2, 3, 4, 5];
const oops = {
  toString() {
    $(`tostring`);
  },
  valueOf() {
    $(`tostring`);
  },
  [tmpObjLitPropKey]() {
    const tmpPrevalAliasThis = this;
    $(`iterator called, o.x=`, o.x);
    const tmpMCCO = tmpPrevalAliasThis.values;
    const tmpMCCP = Symbol.iterator;
    const tmpReturnArg = tmpMCCO[tmpMCCP]();
    return tmpReturnArg;
  },
  values: tmpObjLitVal$1,
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
const b = [ 1, 2, 3, 4, 5 ];
const c = {
  toString(  ) {
    debugger;
    $( "tostring" );
    return undefined;
  },
  valueOf(  ) {
    debugger;
    $( "tostring" );
    return undefined;
  },
  [ a ](  ) {
    const d = this;
    debugger;
    const e = f.x;
    $( "iterator called, o.x=", e );
    const g = d.values;
    const h = Symbol.iterator;
    const i = g[ h ];
    const j = $dotCall( i, g, undefined );
    return j;
  },,
  values: b,
};
const k = $( 1 );
const f = { x: k };
const l = [ ...c ];
const m = f.x;
$( m );
f.x = 10;
l();
l();
l();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitPropKey = Symbol.iterator;
const tmpObjLitVal$1 = [1, 2, 3, 4, 5];
const oops = {
  toString() {
    debugger;
    $(`tostring`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`tostring`);
    return undefined;
  },
  [tmpObjLitPropKey]() {
    const tmpPrevalAliasThis = this;
    debugger;
    let tmpCalleeParam = o.x;
    $(`iterator called, o.x=`, tmpCalleeParam);
    const tmpMCCO = tmpPrevalAliasThis.values;
    const tmpMCCP = Symbol.iterator;
    const tmpMCF = tmpMCCO[tmpMCCP];
    const tmpReturnArg = $dotCall(tmpMCF, tmpMCCO, undefined);
    return tmpReturnArg;
  },
  values: tmpObjLitVal$1,
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
- (todo) array reads var statement with init ObjectExpression


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'iterator called, o.x=', 1
 - 3: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
