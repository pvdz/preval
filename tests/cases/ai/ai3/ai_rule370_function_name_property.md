# Preval test case

# ai_rule370_function_name_property.md

> Ai > Ai3 > Ai rule370 function name property
>
> Rule 370: Function name property

## Options

func.name is not supported. Preval will drop it hard.

- skipEval

## Input

`````js filename=intro
(function() {
  const an_anon_func = function() { $('anon_called'); };
  $('anon_func_name', an_anon_func.name);
  an_anon_func();

  function a_named_func() { $('named_called'); }
  $('named_func_name', a_named_func.name);
  a_named_func();

  const assigned_named = function actual_name() { $('assigned_named_called'); };
  $('assigned_named_name', assigned_named.name);
  assigned_named();

  $('iife_name', (function() { $('iife_called'); return function iife_inner_named(){}; })().name);

  let obj = {
    method_prop: function() { $('method_prop_called'); },
    shorthand_method() { $('shorthand_method_called'); },
    arrow_prop: () => { $('arrow_prop_called'); },
    get getter_prop() { $('getter_name_check'); return this._val; },
    set setter_prop(v) { $('setter_name_check'); this._val = v; }
  };
  $('method_prop_name', obj.method_prop.name);
  $('shorthand_method_name', obj.shorthand_method.name);
  $('arrow_prop_name', obj.arrow_prop.name);
  
  // How to get getter/setter name without getOwnPropertyDescriptor?
  // For now, this test won't explicitly check getter/setter .name from descriptor
  // but will rely on Preval preserving them if they are used.
  // The .name of a getter is `get propName` and setter is `set propName`

  obj.method_prop();
  obj.shorthand_method();
  obj.setter_prop = $('val_for_setter', 123);
  let temp = obj.getter_prop;
  $('getter_val_check', temp);
  obj.arrow_prop();

  // Bound function name
  const boundFunc = a_named_func.bind($('this_arg', {}));
  $('bound_func_name', boundFunc.name); // Should be "bound a_named_func"
  boundFunc();
})();
`````


## Settled


`````js filename=intro
const a_named_func /*:()=>undefined*/ = function () {
  debugger;
  $(`named_called`);
  return undefined;
};
const an_anon_func /*:()=>undefined*/ = function () {
  debugger;
  $(`anon_called`);
  return undefined;
};
const tmpCalleeParam /*:unknown*/ = an_anon_func.name;
$(`anon_func_name`, tmpCalleeParam);
$(`anon_called`);
const tmpCalleeParam$1 /*:unknown*/ = a_named_func.name;
$(`named_func_name`, tmpCalleeParam$1);
$(`named_called`);
const assigned_named /*:()=>undefined*/ = function () {
  debugger;
  $(`assigned_named_called`);
  return undefined;
};
const tmpCalleeParam$3 /*:unknown*/ = assigned_named.name;
$(`assigned_named_name`, tmpCalleeParam$3);
$(`assigned_named_called`);
$(`iife_called`);
const tmpClusterSSA_tmpCompObj /*:()=>undefined*/ = function () {
  debugger;
  return undefined;
};
const tmpCalleeParam$5 /*:unknown*/ = tmpClusterSSA_tmpCompObj.name;
$(`iife_name`, tmpCalleeParam$5);
const tmpObjLitVal /*:()=>undefined*/ = function () {
  debugger;
  $(`method_prop_called`);
  return undefined;
};
const tmpObjLitVal$1 /*:()=>undefined*/ = function () {
  debugger;
  $(`arrow_prop_called`);
  return undefined;
};
const obj /*:object*/ = {
  method_prop: tmpObjLitVal,
  shorthand_method() {
    debugger;
    $(`shorthand_method_called`);
    return undefined;
  },
  arrow_prop: tmpObjLitVal$1,
  get getter_prop() {
    const tmpPrevalAliasThis /*:object*/ = this;
    debugger;
    $(`getter_name_check`);
    const tmpReturnArg$1 /*:unknown*/ = tmpPrevalAliasThis._val;
    return tmpReturnArg$1;
  },
  set setter_prop($$0) {
    const tmpPrevalAliasThis$1 /*:object*/ = this;
    const v /*:unknown*/ = $$0;
    debugger;
    $(`setter_name_check`);
    tmpPrevalAliasThis$1._val = v;
    return undefined;
  },
};
const tmpCompObj$1 /*:unknown*/ = obj.method_prop;
const tmpCalleeParam$7 /*:unknown*/ = tmpCompObj$1.name;
$(`method_prop_name`, tmpCalleeParam$7);
const tmpCompObj$3 /*:unknown*/ = obj.shorthand_method;
const tmpCalleeParam$9 /*:unknown*/ = tmpCompObj$3.name;
$(`shorthand_method_name`, tmpCalleeParam$9);
const tmpCompObj$5 /*:unknown*/ = obj.arrow_prop;
const tmpCalleeParam$11 /*:unknown*/ = tmpCompObj$5.name;
$(`arrow_prop_name`, tmpCalleeParam$11);
const tmpMCF /*:unknown*/ = obj.method_prop;
$dotCall(tmpMCF, obj, `method_prop`);
const tmpMCF$1 /*:unknown*/ = obj.shorthand_method;
$dotCall(tmpMCF$1, obj, `shorthand_method`);
const tmpAssignMemRhs /*:unknown*/ = $(`val_for_setter`, 123);
obj.setter_prop = tmpAssignMemRhs;
const temp /*:unknown*/ = obj.getter_prop;
$(`getter_val_check`, temp);
const tmpMCF$3 /*:unknown*/ = obj.arrow_prop;
$dotCall(tmpMCF$3, obj, `arrow_prop`);
const tmpCalleeParam$13 /*:object*/ = {};
const tmpMCP /*:unknown*/ = $(`this_arg`, tmpCalleeParam$13);
const boundFunc /*:function*/ = $dotCall($function_bind, a_named_func, `bind`, tmpMCP);
const tmpCalleeParam$15 /*:unknown*/ = boundFunc.name;
$(`bound_func_name`, tmpCalleeParam$15);
boundFunc();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a_named_func = function () {
  $(`named_called`);
};
$(
  `anon_func_name`,
  function () {
    $(`anon_called`);
  }.name,
);
$(`anon_called`);
$(`named_func_name`, a_named_func.name);
$(`named_called`);
$(
  `assigned_named_name`,
  function () {
    $(`assigned_named_called`);
  }.name,
);
$(`assigned_named_called`);
$(`iife_called`);
$(`iife_name`, function () {}.name);
const tmpObjLitVal = function () {
  $(`method_prop_called`);
};
const tmpObjLitVal$1 = function () {
  $(`arrow_prop_called`);
};
const obj = {
  method_prop: tmpObjLitVal,
  shorthand_method() {
    $(`shorthand_method_called`);
  },
  arrow_prop: tmpObjLitVal$1,
  get getter_prop() {
    const tmpPrevalAliasThis = this;
    $(`getter_name_check`);
    const tmpReturnArg$1 = tmpPrevalAliasThis._val;
    return tmpReturnArg$1;
  },
  set setter_prop(v) {
    const tmpPrevalAliasThis$1 = this;
    $(`setter_name_check`);
    tmpPrevalAliasThis$1._val = v;
  },
};
$(`method_prop_name`, obj.method_prop.name);
$(`shorthand_method_name`, obj.shorthand_method.name);
$(`arrow_prop_name`, obj.arrow_prop.name);
obj.method_prop();
obj.shorthand_method();
obj.setter_prop = $(`val_for_setter`, 123);
$(`getter_val_check`, obj.getter_prop);
obj.arrow_prop();
const boundFunc = $dotCall($function_bind, a_named_func, `bind`, $(`this_arg`, {}));
$(`bound_func_name`, boundFunc.name);
boundFunc();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "named_called" );
  return undefined;
};
const b = function() {
  debugger;
  $( "anon_called" );
  return undefined;
};
const c = b.name;
$( "anon_func_name", c );
$( "anon_called" );
const d = a.name;
$( "named_func_name", d );
$( "named_called" );
const e = function() {
  debugger;
  $( "assigned_named_called" );
  return undefined;
};
const f = e.name;
$( "assigned_named_name", f );
$( "assigned_named_called" );
$( "iife_called" );
const g = function() {
  debugger;
  return undefined;
};
const h = g.name;
$( "iife_name", h );
const i = function() {
  debugger;
  $( "method_prop_called" );
  return undefined;
};
const j = function() {
  debugger;
  $( "arrow_prop_called" );
  return undefined;
};
const k = {
  method_prop: i,
  shorthand_method(  ) {
    debugger;
    $( "shorthand_method_called" );
    return undefined;
  },
  arrow_prop: j,
  get getter_prop() {
    const l = this;
    debugger;
    $( "getter_name_check" );
    const m = l._val;
    return m;
  },
  set setter_prop( $$0 ) {
    const n = this;
    const o = $$0;
    debugger;
    $( "setter_name_check" );
    n._val = o;
    return undefined;
  },
};
const p = k.method_prop;
const q = p.name;
$( "method_prop_name", q );
const r = k.shorthand_method;
const s = r.name;
$( "shorthand_method_name", s );
const t = k.arrow_prop;
const u = t.name;
$( "arrow_prop_name", u );
const v = k.method_prop;
$dotCall( v, k, "method_prop" );
const w = k.shorthand_method;
$dotCall( w, k, "shorthand_method" );
const x = $( "val_for_setter", 123 );
k.setter_prop = x;
const y = k.getter_prop;
$( "getter_val_check", y );
const z = k.arrow_prop;
$dotCall( z, k, "arrow_prop" );
const ba = {};
const bb = $( "this_arg", ba );
const bc = $dotCall( $function_bind, a, "bind", bb );
const bd = bc.name;
$( "bound_func_name", bd );
bc();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let a_named_func = function () {
    debugger;
    $(`named_called`);
    return undefined;
  };
  const an_anon_func = function () {
    debugger;
    $(`anon_called`);
    return undefined;
  };
  let tmpCalleeParam = an_anon_func.name;
  $(`anon_func_name`, tmpCalleeParam);
  an_anon_func();
  let tmpCalleeParam$1 = a_named_func.name;
  $(`named_func_name`, tmpCalleeParam$1);
  a_named_func();
  const actual_name = function () {
    debugger;
    $(`assigned_named_called`);
    return undefined;
  };
  const assigned_named = actual_name;
  let tmpCalleeParam$3 = assigned_named.name;
  $(`assigned_named_name`, tmpCalleeParam$3);
  assigned_named();
  const tmpCallComplexCallee$1 = function () {
    debugger;
    $(`iife_called`);
    const iife_inner_named = function () {
      debugger;
      return undefined;
    };
    return iife_inner_named;
  };
  const tmpCompObj = tmpCallComplexCallee$1();
  let tmpCalleeParam$5 = tmpCompObj.name;
  $(`iife_name`, tmpCalleeParam$5);
  const tmpObjLitVal = function () {
    debugger;
    $(`method_prop_called`);
    return undefined;
  };
  const tmpObjLitVal$1 = function () {
    debugger;
    $(`arrow_prop_called`);
    return undefined;
  };
  let obj = {
    method_prop: tmpObjLitVal,
    shorthand_method() {
      debugger;
      $(`shorthand_method_called`);
      return undefined;
    },
    arrow_prop: tmpObjLitVal$1,
    get getter_prop() {
      const tmpPrevalAliasThis = this;
      debugger;
      $(`getter_name_check`);
      const tmpReturnArg$1 = tmpPrevalAliasThis._val;
      return tmpReturnArg$1;
    },
    set setter_prop($$0) {
      const tmpPrevalAliasThis$1 = this;
      let v = $$0;
      debugger;
      $(`setter_name_check`);
      tmpPrevalAliasThis$1._val = v;
      return undefined;
    },
  };
  const tmpCompObj$1 = obj.method_prop;
  let tmpCalleeParam$7 = tmpCompObj$1.name;
  $(`method_prop_name`, tmpCalleeParam$7);
  const tmpCompObj$3 = obj.shorthand_method;
  let tmpCalleeParam$9 = tmpCompObj$3.name;
  $(`shorthand_method_name`, tmpCalleeParam$9);
  const tmpCompObj$5 = obj.arrow_prop;
  let tmpCalleeParam$11 = tmpCompObj$5.name;
  $(`arrow_prop_name`, tmpCalleeParam$11);
  const tmpMCF = obj.method_prop;
  $dotCall(tmpMCF, obj, `method_prop`);
  const tmpMCF$1 = obj.shorthand_method;
  $dotCall(tmpMCF$1, obj, `shorthand_method`);
  const tmpAssignMemLhsObj = obj;
  const tmpAssignMemRhs = $(`val_for_setter`, 123);
  tmpAssignMemLhsObj.setter_prop = tmpAssignMemRhs;
  let temp = obj.getter_prop;
  $(`getter_val_check`, temp);
  const tmpMCF$3 = obj.arrow_prop;
  $dotCall(tmpMCF$3, obj, `arrow_prop`);
  const tmpMCF$5 = a_named_func.bind;
  let tmpCalleeParam$13 = {};
  const tmpMCP = $(`this_arg`, tmpCalleeParam$13);
  const boundFunc = $dotCall(tmpMCF$5, a_named_func, `bind`, tmpMCP);
  let tmpCalleeParam$15 = boundFunc.name;
  $(`bound_func_name`, tmpCalleeParam$15);
  boundFunc();
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $function_bind
- (todo) type trackeed tricks can possibly support static $function_bind


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<skipped by option>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
