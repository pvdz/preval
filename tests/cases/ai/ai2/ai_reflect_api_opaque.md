# Preval test case

# ai_reflect_api_opaque.md

> Ai > Ai2 > Ai reflect api opaque
>
> Test: Reflect API methods (get, set, has, apply, construct) with opaque targets/args.

## Input

`````js filename=intro
// Expected: Calls to Reflect methods preserved.
let target_obj = $('reflect_target', { prop: 'value', method: function(x) { return $('method_called', x, this.prop); } });
let key = $('reflect_key', 'prop');
let value_to_set = $('reflect_set_val', 'new_value');
let receiver = $('reflect_receiver', { prop: 'receiver_value' });
let args_list = $('reflect_args', [$('arg1')]);

// Reflect.get
$('reflect_get_result', Reflect.get(target_obj, key, receiver));

// Reflect.set
$('reflect_set_result', Reflect.set(target_obj, key, value_to_set, receiver));
$('reflect_target_after_set', target_obj[key]); // Check if original target was modified if receiver different
$('reflect_receiver_prop_after_set', receiver[key]);

// Reflect.has
$('reflect_has_result', Reflect.has(target_obj, key));

// Reflect.apply
let func_to_apply = $('reflect_func', target_obj.method);
let this_arg = $('reflect_this_arg', { prop: 'this_arg_prop' });
$('reflect_apply_result', Reflect.apply(func_to_apply, this_arg, args_list));

// Reflect.construct
let ctor_func = $('reflect_constructor', function(a) { this.val = $('ctor_val', a); });
let new_target_ctor = $('reflect_new_target'); // Optional, can be same as ctor_func
$('reflect_construct_result_val', new (Reflect.construct(ctor_func, args_list, new_target_ctor))().val);

// Reflect.defineProperty
let def_prop_key = $('reflect_def_prop_key', 'newProp');
let def_prop_desc = $('reflect_def_prop_desc', { value: 'defined', writable: true});
$('reflect_defineProperty_result', Reflect.defineProperty(target_obj, def_prop_key, def_prop_desc));
$('reflect_target_after_defProp', target_obj[def_prop_key]);
`````


## Settled


`````js filename=intro
const tmpObjLitVal$1 /*:(unknown)=>unknown*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis /*:unknown*/ = this;
  const x /*:unknown*/ = $$0;
  debugger;
  const tmpCalleeParam$3 /*:unknown*/ = tmpPrevalAliasThis.prop;
  const tmpReturnArg /*:unknown*/ = $(`method_called`, x, tmpCalleeParam$3);
  return tmpReturnArg;
};
const tmpCalleeParam /*:object*/ /*truthy*/ = { prop: `value`, method: tmpObjLitVal$1 };
const target_obj /*:unknown*/ = $(`reflect_target`, tmpCalleeParam);
const key /*:unknown*/ = $(`reflect_key`, `prop`);
const value_to_set /*:unknown*/ = $(`reflect_set_val`, `new_value`);
const tmpCalleeParam$5 /*:object*/ /*truthy*/ = { prop: `receiver_value` };
const receiver /*:unknown*/ = $(`reflect_receiver`, tmpCalleeParam$5);
const tmpArrElement /*:unknown*/ = $(`arg1`);
const tmpCalleeParam$7 /*:array*/ /*truthy*/ = [tmpArrElement];
const args_list /*:unknown*/ = $(`reflect_args`, tmpCalleeParam$7);
const tmpMCF /*:unknown*/ = Reflect.get;
const tmpCalleeParam$9 /*:unknown*/ = $dotCall(tmpMCF, Reflect, `get`, target_obj, key, receiver);
$(`reflect_get_result`, tmpCalleeParam$9);
const tmpMCF$1 /*:unknown*/ = Reflect.set;
const tmpCalleeParam$11 /*:unknown*/ = $dotCall(tmpMCF$1, Reflect, `set`, target_obj, key, value_to_set, receiver);
$(`reflect_set_result`, tmpCalleeParam$11);
const tmpCalleeParam$13 /*:unknown*/ = target_obj[key];
$(`reflect_target_after_set`, tmpCalleeParam$13);
const tmpCalleeParam$15 /*:unknown*/ = receiver[key];
$(`reflect_receiver_prop_after_set`, tmpCalleeParam$15);
const tmpMCF$3 /*:unknown*/ = Reflect.has;
const tmpCalleeParam$17 /*:unknown*/ = $dotCall(tmpMCF$3, Reflect, `has`, target_obj, key);
$(`reflect_has_result`, tmpCalleeParam$17);
const tmpCalleeParam$19 /*:unknown*/ = target_obj.method;
const func_to_apply /*:unknown*/ = $(`reflect_func`, tmpCalleeParam$19);
const tmpCalleeParam$21 /*:object*/ /*truthy*/ = { prop: `this_arg_prop` };
const this_arg /*:unknown*/ = $(`reflect_this_arg`, tmpCalleeParam$21);
const tmpMCF$5 /*:unknown*/ = Reflect.apply;
const tmpCalleeParam$23 /*:unknown*/ = $dotCall(tmpMCF$5, Reflect, `apply`, func_to_apply, this_arg, args_list);
$(`reflect_apply_result`, tmpCalleeParam$23);
const tmpCalleeParam$25 /*:(unknown)=>undefined*/ = function ($$0 /*uses this*/) {
  const tmpPrevalAliasThis$1 /*:unknown*/ = this;
  const a /*:unknown*/ = $$0;
  debugger;
  const tmpAssignMemRhs /*:unknown*/ = $(`ctor_val`, a);
  tmpPrevalAliasThis$1.val = tmpAssignMemRhs;
  return undefined;
};
const ctor_func /*:unknown*/ = $(`reflect_constructor`, tmpCalleeParam$25);
const new_target_ctor /*:unknown*/ = $(`reflect_new_target`);
const tmpMCF$7 /*:unknown*/ = Reflect.construct;
const tmpNewCallee /*:unknown*/ = $dotCall(tmpMCF$7, Reflect, `construct`, ctor_func, args_list, new_target_ctor);
const tmpCompObj /*:object*/ /*truthy*/ = new tmpNewCallee();
const tmpCalleeParam$27 /*:unknown*/ = tmpCompObj.val;
$(`reflect_construct_result_val`, tmpCalleeParam$27);
const def_prop_key /*:unknown*/ = $(`reflect_def_prop_key`, `newProp`);
const tmpCalleeParam$29 /*:object*/ /*truthy*/ = { value: `defined`, writable: true };
const def_prop_desc /*:unknown*/ = $(`reflect_def_prop_desc`, tmpCalleeParam$29);
const tmpMCF$9 /*:unknown*/ = Reflect.defineProperty;
const tmpCalleeParam$31 /*:unknown*/ = $dotCall(tmpMCF$9, Reflect, `defineProperty`, target_obj, def_prop_key, def_prop_desc);
$(`reflect_defineProperty_result`, tmpCalleeParam$31);
const tmpCalleeParam$33 /*:unknown*/ = target_obj[def_prop_key];
$(`reflect_target_after_defProp`, tmpCalleeParam$33);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal$1 = function (x) {
  const tmpPrevalAliasThis = this;
  const tmpReturnArg = $(`method_called`, x, tmpPrevalAliasThis.prop);
  return tmpReturnArg;
};
const target_obj = $(`reflect_target`, { prop: `value`, method: tmpObjLitVal$1 });
const key = $(`reflect_key`, `prop`);
const value_to_set = $(`reflect_set_val`, `new_value`);
const receiver = $(`reflect_receiver`, { prop: `receiver_value` });
const tmpArrElement = $(`arg1`);
const args_list = $(`reflect_args`, [tmpArrElement]);
$(`reflect_get_result`, Reflect.get(target_obj, key, receiver));
$(`reflect_set_result`, Reflect.set(target_obj, key, value_to_set, receiver));
$(`reflect_target_after_set`, target_obj[key]);
$(`reflect_receiver_prop_after_set`, receiver[key]);
$(`reflect_has_result`, Reflect.has(target_obj, key));
const func_to_apply = $(`reflect_func`, target_obj.method);
const this_arg = $(`reflect_this_arg`, { prop: `this_arg_prop` });
$(`reflect_apply_result`, Reflect.apply(func_to_apply, this_arg, args_list));
const tmpNewCallee = Reflect.construct(
  $(`reflect_constructor`, function (a) {
    const tmpPrevalAliasThis$1 = this;
    tmpPrevalAliasThis$1.val = $(`ctor_val`, a);
  }),
  args_list,
  $(`reflect_new_target`),
);
$(`reflect_construct_result_val`, new tmpNewCallee().val);
const def_prop_key = $(`reflect_def_prop_key`, `newProp`);
const def_prop_desc = $(`reflect_def_prop_desc`, { value: `defined`, writable: true });
$(`reflect_defineProperty_result`, Reflect.defineProperty(target_obj, def_prop_key, def_prop_desc));
$(`reflect_target_after_defProp`, target_obj[def_prop_key]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = this;
  const c = $$0;
  debugger;
  const d = b.prop;
  const e = $( "method_called", c, d );
  return e;
};
const f = {
  prop: "value",
  method: a,
};
const g = $( "reflect_target", f );
const h = $( "reflect_key", "prop" );
const i = $( "reflect_set_val", "new_value" );
const j = { prop: "receiver_value" };
const k = $( "reflect_receiver", j );
const l = $( "arg1" );
const m = [ l ];
const n = $( "reflect_args", m );
const o = Reflect.get;
const p = $dotCall( o, Reflect, "get", g, h, k );
$( "reflect_get_result", p );
const q = Reflect.set;
const r = $dotCall( q, Reflect, "set", g, h, i, k );
$( "reflect_set_result", r );
const s = g[ h ];
$( "reflect_target_after_set", s );
const t = k[ h ];
$( "reflect_receiver_prop_after_set", t );
const u = Reflect.has;
const v = $dotCall( u, Reflect, "has", g, h );
$( "reflect_has_result", v );
const w = g.method;
const x = $( "reflect_func", w );
const y = { prop: "this_arg_prop" };
const z = $( "reflect_this_arg", y );
const ba = Reflect.apply;
const bb = $dotCall( ba, Reflect, "apply", x, z, n );
$( "reflect_apply_result", bb );
const bc = function($$0 ) {
  const bd = this;
  const be = $$0;
  debugger;
  const bf = $( "ctor_val", be );
  bd.val = bf;
  return undefined;
};
const bg = $( "reflect_constructor", bc );
const bh = $( "reflect_new_target" );
const bi = Reflect.construct;
const bj = $dotCall( bi, Reflect, "construct", bg, n, bh );
const bk = new bj();
const bl = bk.val;
$( "reflect_construct_result_val", bl );
const bm = $( "reflect_def_prop_key", "newProp" );
const bn = {
  value: "defined",
  writable: true,
};
const bo = $( "reflect_def_prop_desc", bn );
const bp = Reflect.defineProperty;
const bq = $dotCall( bp, Reflect, "defineProperty", g, bm, bo );
$( "reflect_defineProperty_result", bq );
const br = g[ bm ];
$( "reflect_target_after_defProp", br );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = `value`;
const tmpObjLitVal$1 = function ($$0) {
  const tmpPrevalAliasThis = this;
  let x = $$0;
  debugger;
  let tmpCalleeParam$1 = x;
  let tmpCalleeParam$3 = tmpPrevalAliasThis.prop;
  const tmpReturnArg = $(`method_called`, tmpCalleeParam$1, tmpCalleeParam$3);
  return tmpReturnArg;
};
let tmpCalleeParam = { prop: tmpObjLitVal, method: tmpObjLitVal$1 };
let target_obj = $(`reflect_target`, tmpCalleeParam);
let key = $(`reflect_key`, `prop`);
let value_to_set = $(`reflect_set_val`, `new_value`);
let tmpCalleeParam$5 = { prop: `receiver_value` };
let receiver = $(`reflect_receiver`, tmpCalleeParam$5);
const tmpArrElement = $(`arg1`);
let tmpCalleeParam$7 = [tmpArrElement];
let args_list = $(`reflect_args`, tmpCalleeParam$7);
const tmpMCF = Reflect.get;
let tmpCalleeParam$9 = $dotCall(tmpMCF, Reflect, `get`, target_obj, key, receiver);
$(`reflect_get_result`, tmpCalleeParam$9);
const tmpMCF$1 = Reflect.set;
let tmpCalleeParam$11 = $dotCall(tmpMCF$1, Reflect, `set`, target_obj, key, value_to_set, receiver);
$(`reflect_set_result`, tmpCalleeParam$11);
let tmpCalleeParam$13 = target_obj[key];
$(`reflect_target_after_set`, tmpCalleeParam$13);
let tmpCalleeParam$15 = receiver[key];
$(`reflect_receiver_prop_after_set`, tmpCalleeParam$15);
const tmpMCF$3 = Reflect.has;
let tmpCalleeParam$17 = $dotCall(tmpMCF$3, Reflect, `has`, target_obj, key);
$(`reflect_has_result`, tmpCalleeParam$17);
let tmpCalleeParam$19 = target_obj.method;
let func_to_apply = $(`reflect_func`, tmpCalleeParam$19);
let tmpCalleeParam$21 = { prop: `this_arg_prop` };
let this_arg = $(`reflect_this_arg`, tmpCalleeParam$21);
const tmpMCF$5 = Reflect.apply;
let tmpCalleeParam$23 = $dotCall(tmpMCF$5, Reflect, `apply`, func_to_apply, this_arg, args_list);
$(`reflect_apply_result`, tmpCalleeParam$23);
let tmpCalleeParam$25 = function ($$0) {
  const tmpPrevalAliasThis$1 = this;
  let a = $$0;
  debugger;
  const tmpAssignMemLhsObj = tmpPrevalAliasThis$1;
  const tmpAssignMemRhs = $(`ctor_val`, a);
  tmpAssignMemLhsObj.val = tmpAssignMemRhs;
  return undefined;
};
let ctor_func = $(`reflect_constructor`, tmpCalleeParam$25);
let new_target_ctor = $(`reflect_new_target`);
const tmpMCF$7 = Reflect.construct;
const tmpNewCallee = $dotCall(tmpMCF$7, Reflect, `construct`, ctor_func, args_list, new_target_ctor);
const tmpCompObj = new tmpNewCallee();
let tmpCalleeParam$27 = tmpCompObj.val;
$(`reflect_construct_result_val`, tmpCalleeParam$27);
let def_prop_key = $(`reflect_def_prop_key`, `newProp`);
let tmpCalleeParam$29 = { value: `defined`, writable: true };
let def_prop_desc = $(`reflect_def_prop_desc`, tmpCalleeParam$29);
const tmpMCF$9 = Reflect.defineProperty;
let tmpCalleeParam$31 = $dotCall(tmpMCF$9, Reflect, `defineProperty`, target_obj, def_prop_key, def_prop_desc);
$(`reflect_defineProperty_result`, tmpCalleeParam$31);
let tmpCalleeParam$33 = target_obj[def_prop_key];
$(`reflect_target_after_defProp`, tmpCalleeParam$33);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

Reflect


## Runtime Outcome


Should call `$` with:
 - 1: 'reflect_target', { prop: '"value"', method: '"<function>"' }
 - 2: 'reflect_key', 'prop'
 - 3: 'reflect_set_val', 'new_value'
 - 4: 'reflect_receiver', { prop: '"receiver_value"' }
 - 5: 'arg1'
 - 6: 'reflect_args', ['arg1']
 - eval returned: ('<crash[ Reflect.get called on non-object ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
