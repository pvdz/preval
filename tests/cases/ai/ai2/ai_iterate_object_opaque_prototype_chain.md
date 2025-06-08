# Preval test case

# ai_iterate_object_opaque_prototype_chain.md

> Ai > Ai2 > Ai iterate object opaque prototype chain
>
> Test: for...in over object with opaque prototype chain elements.

## Input

`````js filename=intro
// Expected: Iteration includes properties from opaque prototypes, effects preserved.
let p1_effects = [];
let p1 = $('opaque_proto1', {
  p1_prop: ($('p1_prop_get_effect'), p1_effects.push('p1_get'), 'p1_val'),
  get p1_getter() { ($('p1_getter_effect'), p1_effects.push('p1_getter')); return 'p1_getter_val'; }
});

let p2 = Object.create(p1);
p2[$('p2_key_name', 'p2_own_prop')] = $('p2_val_content', 'p2_own_val');

let obj = Object.create(p2);
obj[$('obj_key_name', 'obj_own_prop')] = $('obj_val_content', 'obj_own_val');

let keys_iterated = [];
let values_during_iteration = [];
for (const k in obj) {
  keys_iterated.push(k);
  if (Object.prototype.hasOwnProperty.call(obj, k)) { // Check direct properties vs inherited
    $('iter_own_prop', k, obj[k]);
  } else {
    $('iter_inherited_prop', k, obj[k]);
  }
  values_during_iteration.push(obj[k]); // Access property during iteration
}
$('for_in_opaque_chain_keys', keys_iterated.sort().join(','));
$('for_in_p1_effects', p1_effects.join(','));
$('for_in_values_accessed', values_during_iteration.join('|'));
`````


## Settled


`````js filename=intro
const p1_effects /*:array*/ /*truthy*/ = [];
$(`p1_prop_get_effect`);
$dotCall($array_push, p1_effects, `push`, `p1_get`);
const tmpCalleeParam /*:object*/ /*truthy*/ = {
  p1_prop: `p1_val`,
  get p1_getter() {
    debugger;
    $(`p1_getter_effect`);
    $dotCall($array_push, p1_effects, `push`, `p1_getter`);
    return `p1_getter_val`;
  },
};
const p1 /*:unknown*/ = $(`opaque_proto1`, tmpCalleeParam);
const p2 /*:object*/ /*truthy*/ = $Object_create(p1);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`p2_key_name`, `p2_own_prop`);
const tmpAssignComputedRhs /*:unknown*/ = $(`p2_val_content`, `p2_own_val`);
p2[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const obj /*:object*/ /*truthy*/ = $Object_create(p2);
const tmpAssignComMemLhsProp$1 /*:unknown*/ = $(`obj_key_name`, `obj_own_prop`);
const tmpAssignComputedRhs$1 /*:unknown*/ = $(`obj_val_content`, `obj_own_val`);
obj[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
const tmpForInGen /*:unknown*/ = $forIn(obj);
const keys_iterated /*:array*/ /*truthy*/ = [];
const values_during_iteration /*:array*/ /*truthy*/ = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext /*:unknown*/ = tmpForInGen();
  const tmpIfTest /*:unknown*/ = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const k /*:unknown*/ = tmpForInNext.value;
    $dotCall($array_push, keys_iterated, `push`, k);
    $dotCall($object_hasOwnProperty, obj, undefined, k);
    const tmpCalleeParam$3 /*:unknown*/ = obj[k];
    $(`iter_own_prop`, k, tmpCalleeParam$3);
    const tmpMCP /*:unknown*/ = obj[k];
    $dotCall($array_push, values_during_iteration, `push`, tmpMCP);
  }
}
const tmpMCOO$1 /*:array*/ /*truthy*/ = $dotCall($array_sort, keys_iterated, `sort`);
const tmpCalleeParam$9 /*:string*/ = $dotCall($array_join, tmpMCOO$1, `join`, `,`);
$(`for_in_opaque_chain_keys`, tmpCalleeParam$9);
const tmpCalleeParam$11 /*:string*/ = $dotCall($array_join, p1_effects, `join`, `,`);
$(`for_in_p1_effects`, tmpCalleeParam$11);
const tmpCalleeParam$13 /*:string*/ = $dotCall($array_join, values_during_iteration, `join`, `|`);
$(`for_in_values_accessed`, tmpCalleeParam$13);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const p1_effects = [];
$(`p1_prop_get_effect`);
$dotCall($array_push, p1_effects, `push`, `p1_get`);
const p2 = $Object_create(
  $(`opaque_proto1`, {
    p1_prop: `p1_val`,
    get p1_getter() {
      $(`p1_getter_effect`);
      $dotCall($array_push, p1_effects, `push`, `p1_getter`);
      return `p1_getter_val`;
    },
  }),
);
const tmpAssignComMemLhsProp = $(`p2_key_name`, `p2_own_prop`);
const tmpAssignComputedRhs = $(`p2_val_content`, `p2_own_val`);
p2[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
const obj = $Object_create(p2);
const tmpAssignComMemLhsProp$1 = $(`obj_key_name`, `obj_own_prop`);
const tmpAssignComputedRhs$1 = $(`obj_val_content`, `obj_own_val`);
obj[tmpAssignComMemLhsProp$1] = tmpAssignComputedRhs$1;
const tmpForInGen = $forIn(obj);
const keys_iterated = [];
const values_during_iteration = [];
while (true) {
  const tmpForInNext = tmpForInGen();
  if (tmpForInNext.done) {
    break;
  } else {
    const k = tmpForInNext.value;
    $dotCall($array_push, keys_iterated, `push`, k);
    $dotCall($object_hasOwnProperty, obj, undefined, k);
    $(`iter_own_prop`, k, obj[k]);
    $dotCall($array_push, values_during_iteration, `push`, obj[k]);
  }
}
$(`for_in_opaque_chain_keys`, $dotCall($array_join, $dotCall($array_sort, keys_iterated, `sort`), `join`, `,`));
$(`for_in_p1_effects`, $dotCall($array_join, p1_effects, `join`, `,`));
$(`for_in_values_accessed`, $dotCall($array_join, values_during_iteration, `join`, `|`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( "p1_prop_get_effect" );
$dotCall( $array_push, a, "push", "p1_get" );
const b = {
  p1_prop: "p1_val",
  get p1_getter() {
    debugger;
    $( "p1_getter_effect" );
    $dotCall( $array_push, a, "push", "p1_getter" );
    return "p1_getter_val";
  },
};
const c = $( "opaque_proto1", b );
const d = $Object_create( c );
const e = $( "p2_key_name", "p2_own_prop" );
const f = $( "p2_val_content", "p2_own_val" );
d[e] = f;
const g = $Object_create( d );
const h = $( "obj_key_name", "obj_own_prop" );
const i = $( "obj_val_content", "obj_own_val" );
g[h] = i;
const j = $forIn( g );
const k = [];
const l = [];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const m = j();
  const n = m.done;
  if (n) {
    break;
  }
  else {
    const o = m.value;
    $dotCall( $array_push, k, "push", o );
    $dotCall( $object_hasOwnProperty, g, undefined, o );
    const p = g[ o ];
    $( "iter_own_prop", o, p );
    const q = g[ o ];
    $dotCall( $array_push, l, "push", q );
  }
}
const r = $dotCall( $array_sort, k, "sort" );
const s = $dotCall( $array_join, r, "join", "," );
$( "for_in_opaque_chain_keys", s );
const t = $dotCall( $array_join, a, "join", "," );
$( "for_in_p1_effects", t );
const u = $dotCall( $array_join, l, "join", "|" );
$( "for_in_values_accessed", u );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let p1_effects = [];
$(`p1_prop_get_effect`);
const tmpMCF = p1_effects.push;
$dotCall(tmpMCF, p1_effects, `push`, `p1_get`);
const tmpObjLitVal = `p1_val`;
let tmpCalleeParam = {
  p1_prop: tmpObjLitVal,
  get p1_getter() {
    debugger;
    $(`p1_getter_effect`);
    const tmpMCF$1 = p1_effects.push;
    $dotCall(tmpMCF$1, p1_effects, `push`, `p1_getter`);
    return `p1_getter_val`;
  },
};
let p1 = $(`opaque_proto1`, tmpCalleeParam);
const tmpMCF$3 = $Object_create;
let p2 = $Object_create(p1);
const tmpAssignComMemLhsObj = p2;
const tmpAssignComMemLhsProp = $(`p2_key_name`, `p2_own_prop`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(`p2_val_content`, `p2_own_val`);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
const tmpMCF$5 = $Object_create;
let obj = $Object_create(p2);
const tmpAssignComMemLhsObj$1 = obj;
const tmpAssignComMemLhsProp$1 = $(`obj_key_name`, `obj_own_prop`);
const tmpAssignComputedObj$1 = tmpAssignComMemLhsObj$1;
const tmpAssignComputedProp$1 = tmpAssignComMemLhsProp$1;
const tmpAssignComputedRhs$1 = $(`obj_val_content`, `obj_own_val`);
tmpAssignComputedObj$1[tmpAssignComputedProp$1] = tmpAssignComputedRhs$1;
let keys_iterated = [];
let values_during_iteration = [];
const tmpForInGen = $forIn(obj);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpForInNext = tmpForInGen();
  const tmpIfTest = tmpForInNext.done;
  if (tmpIfTest) {
    break;
  } else {
    const k = tmpForInNext.value;
    const tmpMCF$7 = keys_iterated.push;
    $dotCall(tmpMCF$7, keys_iterated, `push`, k);
    const tmpCompObj = $Object_prototype;
    const tmpMCOO = tmpCompObj.hasOwnProperty;
    const tmpMCF$9 = tmpMCOO.call;
    const tmpIfTest$1 = $dotCall(tmpMCF$9, tmpMCOO, `call`, obj, k);
    if (tmpIfTest$1) {
      let tmpCalleeParam$1 = k;
      let tmpCalleeParam$3 = obj[k];
      $(`iter_own_prop`, tmpCalleeParam$1, tmpCalleeParam$3);
    } else {
      let tmpCalleeParam$5 = k;
      let tmpCalleeParam$7 = obj[k];
      $(`iter_inherited_prop`, tmpCalleeParam$5, tmpCalleeParam$7);
    }
    const tmpMCF$11 = values_during_iteration.push;
    const tmpMCP = obj[k];
    $dotCall(tmpMCF$11, values_during_iteration, `push`, tmpMCP);
  }
}
const tmpMCF$13 = keys_iterated.sort;
const tmpMCOO$1 = $dotCall(tmpMCF$13, keys_iterated, `sort`);
const tmpMCF$15 = tmpMCOO$1.join;
let tmpCalleeParam$9 = $dotCall(tmpMCF$15, tmpMCOO$1, `join`, `,`);
$(`for_in_opaque_chain_keys`, tmpCalleeParam$9);
const tmpMCF$17 = p1_effects.join;
let tmpCalleeParam$11 = $dotCall(tmpMCF$17, p1_effects, `join`, `,`);
$(`for_in_p1_effects`, tmpCalleeParam$11);
const tmpMCF$19 = values_during_iteration.join;
let tmpCalleeParam$13 = $dotCall(tmpMCF$19, values_during_iteration, `join`, `|`);
$(`for_in_values_accessed`, tmpCalleeParam$13);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) access object property that also exists on prototype? $array_push
- (todo) access object property that also exists on prototype? $array_sort
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement
- (todo) type trackeed tricks can possibly support static $Object_create
- (todo) type trackeed tricks can possibly support static $array_sort
- (todo) type trackeed tricks can possibly support static $object_hasOwnProperty


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'p1_prop_get_effect'
 - 2: 'opaque_proto1', { p1_prop: '"p1_val"', p1_getter: '<get/set>' }
 - eval returned: ('<crash[ Object prototype may only be an Object or null: opaque_proto1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
