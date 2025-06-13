# Preval test case

# ai_rule343_obj_setter_opaque_value.md

> Ai > Ai3 > Ai rule343 obj setter opaque value
>
> Test: Object setter invoked with an opaque value.

## Input

`````js filename=intro
// Expected: let o = { set x(v) { $('set_x', v); } }; o.x = $('val');
let store = $('initial_store');
const obj = {
  _val: $('initial_prop_val'),
  set prop(value) {
    $('setter_invoked', value);
    this._val = value;
    store = $('store_updated', value);
  }
};
obj.prop = $('new_value');
$('final_store', store);
$('final_prop_val', obj._val);
`````


## Settled


`````js filename=intro
let store /*:unknown*/ = $(`initial_store`);
const tmpObjLitVal /*:unknown*/ = $(`initial_prop_val`);
const tmpAssignMemRhs /*:unknown*/ = $(`new_value`);
const obj /*:object*/ /*truthy*/ = {
  _val: tmpObjLitVal,
  set prop($$0) {
    const tmpPrevalAliasThis /*:unknown*/ = this;
    const value /*:unknown*/ = $$0;
    debugger;
    $(`setter_invoked`, value);
    tmpPrevalAliasThis._val = value;
    store = $(`store_updated`, value);
    return undefined;
  },
};
obj.prop = tmpAssignMemRhs;
$(`final_store`, store);
const tmpCalleeParam /*:unknown*/ = obj._val;
$(`final_prop_val`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let store = $(`initial_store`);
const tmpObjLitVal = $(`initial_prop_val`);
const tmpAssignMemRhs = $(`new_value`);
const obj = {
  _val: tmpObjLitVal,
  set prop(value) {
    const tmpPrevalAliasThis = this;
    $(`setter_invoked`, value);
    tmpPrevalAliasThis._val = value;
    store = $(`store_updated`, value);
  },
};
obj.prop = tmpAssignMemRhs;
$(`final_store`, store);
$(`final_prop_val`, obj._val);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $( "initial_store" );
const b = $( "initial_prop_val" );
const c = $( "new_value" );
const d = {
  _val: b,
  set prop( $$0 ) {
    const e = this;
    const f = $$0;
    debugger;
    $( "setter_invoked", f );
    e._val = f;
    a = $( "store_updated", f );
    return undefined;
  },
};
d.prop = c;
$( "final_store", a );
const g = d._val;
$( "final_prop_val", g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let store = $(`initial_store`);
const tmpObjLitVal = $(`initial_prop_val`);
const obj = {
  _val: tmpObjLitVal,
  set prop($$0) {
    const tmpPrevalAliasThis = this;
    let value = $$0;
    debugger;
    $(`setter_invoked`, value);
    tmpPrevalAliasThis._val = value;
    store = $(`store_updated`, value);
    return undefined;
  },
};
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = $(`new_value`);
tmpAssignMemLhsObj.prop = tmpAssignMemRhs;
$(`final_store`, store);
let tmpCalleeParam = obj._val;
$(`final_prop_val`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial_store'
 - 2: 'initial_prop_val'
 - 3: 'new_value'
 - 4: 'setter_invoked', 'new_value'
 - 5: 'store_updated', 'new_value'
 - 6: 'final_store', 'store_updated'
 - 7: 'final_prop_val', 'new_value'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
