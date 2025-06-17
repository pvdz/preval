# Preval test case

# ai_rule378_void_operator_expressions.md

> Ai > Ai3 > Ai rule378 void operator expressions
>
> Rule 378: void operator on various expression types

## Input

`````js filename=intro
(function() {
  let x = 10;
  let obj = {
    p: 20,
    m: function() { $('obj_m_called'); this.p = 30; return 40; },
    _getter_val: 50,
    get getterProp() { $('getter_called'); this._getter_val++; return this._getter_val -1; }
  };

  // Test 1: void literal
  let res1 = void 0;
  $('res1', res1, typeof res1);
  let res_lit_str = void 'abc';
  $('res_lit_str', res_lit_str);

  // Test 2: void opaque call
  let res2 = void $('effect1', (x=100));
  $('res2', res2, x); // x should be 100

  // Test 3: void assignment
  let y;
  let res3 = void (y = $('assigned_val_y', x + 1)); // x is 100
  $('res3', res3, y);

  // Test 4: void property access (with side effect from getter)
  let res4 = void obj.getterProp;
  $('res4', res4, obj._getter_val); // Check side effect on _getter_val

  // Test 5: void method call (with side effect)
  let res5 = void obj.m();
  $('res5', res5, obj.p);

  // Test 6: void on an expression that throws
  try {
    let res6 = void ($('throwing_op'), (() => { throw new Error('test_error'); })());
    $('res6_no_error', res6);
  } catch (e) {
    $('res6_error', e.name, e.message);
  }
})();
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:()=>number*/ = function (/*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  debugger;
  $(`obj_m_called`);
  tmpPrevalAliasThis.p = 30;
  return 40;
};
$(`res1`, undefined, `undefined`);
$(`res_lit_str`, undefined);
$(`effect1`, 100);
$(`res2`, undefined, 100);
const y /*:unknown*/ = $(`assigned_val_y`, 101);
$(`res3`, undefined, y);
const obj /*:object*/ /*truthy*/ = {
  p: 20,
  m: tmpObjLitVal$1,
  _getter_val: 50,
  get getterProp() {
    const tmpPrevalAliasThis$1 /*:unknown*/ = this;
    debugger;
    $(`getter_called`);
    const tmpUpdProp /*:unknown*/ = tmpPrevalAliasThis$1._getter_val;
    const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
    const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
    tmpPrevalAliasThis$1._getter_val = tmpUpdInc;
    const tmpBinLhs /*:unknown*/ = tmpPrevalAliasThis$1._getter_val;
    const tmpReturnArg /*:number*/ = tmpBinLhs - 1;
    return tmpReturnArg;
  },
};
obj.getterProp;
const tmpCalleeParam$9 /*:unknown*/ = obj._getter_val;
$(`res4`, undefined, tmpCalleeParam$9);
const tmpMCF /*:unknown*/ = obj.m;
$dotCall(tmpMCF, obj, `m`);
const tmpCalleeParam$13 /*:unknown*/ = obj.p;
$(`res5`, undefined, tmpCalleeParam$13);
try {
  $(`throwing_op`);
  const tmpThrowArg /*:object*/ /*truthy*/ = new $error_constructor(`test_error`);
  throw tmpThrowArg;
} catch (e) {
  const tmpCalleeParam$15 /*:unknown*/ = e.name;
  const tmpCalleeParam$17 /*:unknown*/ = e.message;
  $(`res6_error`, tmpCalleeParam$15, tmpCalleeParam$17);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function () {
  const tmpPrevalAliasThis = this;
  $(`obj_m_called`);
  tmpPrevalAliasThis.p = 30;
  return 40;
};
$(`res1`, undefined, `undefined`);
$(`res_lit_str`, undefined);
$(`effect1`, 100);
$(`res2`, undefined, 100);
$(`res3`, undefined, $(`assigned_val_y`, 101));
const obj = {
  p: 20,
  m: tmpObjLitVal$1,
  _getter_val: 50,
  get getterProp() {
    const tmpPrevalAliasThis$1 = this;
    $(`getter_called`);
    tmpPrevalAliasThis$1._getter_val = $coerce(tmpPrevalAliasThis$1._getter_val, `number`) + 1;
    const tmpReturnArg = tmpPrevalAliasThis$1._getter_val - 1;
    return tmpReturnArg;
  },
};
obj.getterProp;
$(`res4`, undefined, obj._getter_val);
obj.m();
$(`res5`, undefined, obj.p);
try {
  $(`throwing_op`);
  const tmpThrowArg = new $error_constructor(`test_error`);
  throw tmpThrowArg;
} catch (e) {
  $(`res6_error`, e.name, e.message);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  $( "obj_m_called" );
  b.p = 30;
  return 40;
};
$( "res1", undefined, "undefined" );
$( "res_lit_str", undefined );
$( "effect1", 100 );
$( "res2", undefined, 100 );
const c = $( "assigned_val_y", 101 );
$( "res3", undefined, c );
const d = {
  p: 20,
  m: a,
  _getter_val: 50,
  get getterProp() {
    const e = this;
    debugger;
    $( "getter_called" );
    const f = e._getter_val;
    const g = $coerce( f, "number" );
    const h = g + 1;
    e._getter_val = h;
    const i = e._getter_val;
    const j = i - 1;
    return j;
  },
};
d.getterProp;
const k = d._getter_val;
$( "res4", undefined, k );
const l = d.m;
$dotCall( l, d, "m" );
const m = d.p;
$( "res5", undefined, m );
try {
  $( "throwing_op" );
  const n = new $error_constructor( "test_error" );
  throw n;
}
catch (o) {
  const p = o.name;
  const q = o.message;
  $( "res6_error", p, q );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let x = 10;
  const tmpObjLitVal = 20;
  const tmpObjLitVal$1 = function () {
    const tmpPrevalAliasThis = this;
    debugger;
    $(`obj_m_called`);
    tmpPrevalAliasThis.p = 30;
    return 40;
  };
  let obj = {
    p: tmpObjLitVal,
    m: tmpObjLitVal$1,
    _getter_val: 50,
    get getterProp() {
      const tmpPrevalAliasThis$1 = this;
      debugger;
      $(`getter_called`);
      const tmpUpdObj = tmpPrevalAliasThis$1;
      const tmpUpdProp = tmpUpdObj._getter_val;
      const tmpUpdNum = $coerce(tmpUpdProp, `number`);
      const tmpUpdInc = tmpUpdNum + 1;
      tmpUpdObj._getter_val = tmpUpdInc;
      const tmpBinLhs = tmpPrevalAliasThis$1._getter_val;
      const tmpReturnArg = tmpBinLhs - 1;
      return tmpReturnArg;
    },
  };
  let res1 = undefined;
  let tmpCalleeParam = res1;
  let tmpCalleeParam$1 = typeof res1;
  $(`res1`, tmpCalleeParam, tmpCalleeParam$1);
  let res_lit_str = undefined;
  $(`res_lit_str`, undefined);
  x = 100;
  let tmpCalleeParam$3 = x;
  $(`effect1`, x);
  let res2 = undefined;
  $(`res2`, undefined, x);
  let y = undefined;
  let tmpCalleeParam$5 = x + 1;
  y = $(`assigned_val_y`, tmpCalleeParam$5);
  let res3 = undefined;
  $(`res3`, undefined, y);
  obj.getterProp;
  let res4 = undefined;
  let tmpCalleeParam$7 = res4;
  let tmpCalleeParam$9 = obj._getter_val;
  $(`res4`, tmpCalleeParam$7, tmpCalleeParam$9);
  const tmpMCF = obj.m;
  $dotCall(tmpMCF, obj, `m`);
  let res5 = undefined;
  let tmpCalleeParam$11 = res5;
  let tmpCalleeParam$13 = obj.p;
  $(`res5`, tmpCalleeParam$11, tmpCalleeParam$13);
  try {
    $(`throwing_op`);
    const tmpCallComplexCallee$1 = function () {
      debugger;
      const tmpThrowArg = new $error_constructor(`test_error`);
      throw tmpThrowArg;
    };
    tmpCallComplexCallee$1();
    let res6 = undefined;
    $(`res6_no_error`, undefined);
  } catch (e) {
    let tmpCalleeParam$15 = e.name;
    let tmpCalleeParam$17 = e.message;
    $(`res6_error`, tmpCalleeParam$15, tmpCalleeParam$17);
  }
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'res1', undefined, 'undefined'
 - 2: 'res_lit_str', undefined
 - 3: 'effect1', 100
 - 4: 'res2', undefined, 100
 - 5: 'assigned_val_y', 101
 - 6: 'res3', undefined, 'assigned_val_y'
 - 7: 'getter_called'
 - 8: 'res4', undefined, 51
 - 9: 'obj_m_called'
 - 10: 'res5', undefined, 30
 - 11: 'throwing_op'
 - 12: 'res6_error', 'Error', 'test_error'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
