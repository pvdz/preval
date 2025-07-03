# Preval test case

# ai_rule366_obj_destruct_rest_opaque.md

> Ai > Ai3 > Ai rule366 obj destruct rest opaque
>
> Rule 366: Object destructuring rest on opaque source

## Input

`````js filename=intro
(function() {
  let source1 = $('get_obj1', { a: 1, b: 2, c: 3 });
  let { a, ...rest1 } = source1;
  $('a1', a);
  $('rest1_b', rest1.b);
  $('rest1_c', rest1.c);
  $('rest1_a_exists', 'a' in rest1);

  let source2 = $('get_obj2', { x: 10 });
  let { x, y = $('default_y', 20), ...rest2 } = source2;
  $('x2', x);
  $('y2', y);
  $('rest2_keys', Object.keys(rest2).join(','));
})();
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2, c: 3 };
const source1 /*:unknown*/ = $(`get_obj1`, tmpCalleeParam);
const a /*:unknown*/ = source1.a;
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [`a`];
const rest1 /*:unknown*/ = $objPatternRest(source1, tmpCalleeParam$3, `rest1`);
$(`a1`, a);
const tmpCalleeParam$5 /*:unknown*/ = rest1.b;
$(`rest1_b`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:unknown*/ = rest1.c;
$(`rest1_c`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:boolean*/ = `a` in rest1;
$(`rest1_a_exists`, tmpCalleeParam$9);
const tmpCalleeParam$11 /*:object*/ /*truthy*/ = { x: 10 };
const source2 /*:unknown*/ = $(`get_obj2`, tmpCalleeParam$11);
const x /*:unknown*/ = source2.x;
const tmpOPBD /*:unknown*/ = source2.y;
let y /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  y = $(`default_y`, 20);
} else {
  y = tmpOPBD;
}
const tmpCalleeParam$15 /*:array*/ /*truthy*/ = [`x`, `y`];
const rest2 /*:unknown*/ = $objPatternRest(source2, tmpCalleeParam$15, `rest2`);
$(`x2`, x);
$(`y2`, y);
const tmpMCOO /*:array*/ /*truthy*/ = $Object_keys(rest2);
const tmpCalleeParam$17 /*:string*/ = $dotCall($array_join, tmpMCOO, `join`, `,`);
$(`rest2_keys`, tmpCalleeParam$17);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const source1 = $(`get_obj1`, { a: 1, b: 2, c: 3 });
const a = source1.a;
const rest1 = $objPatternRest(source1, [`a`], `rest1`);
$(`a1`, a);
$(`rest1_b`, rest1.b);
$(`rest1_c`, rest1.c);
$(`rest1_a_exists`, `a` in rest1);
const source2 = $(`get_obj2`, { x: 10 });
const x = source2.x;
const tmpOPBD = source2.y;
let y = undefined;
if (tmpOPBD === undefined) {
  y = $(`default_y`, 20);
} else {
  y = tmpOPBD;
}
const rest2 = $objPatternRest(source2, [`x`, `y`], `rest2`);
$(`x2`, x);
$(`y2`, y);
$(`rest2_keys`, $dotCall($array_join, $Object_keys(rest2), `join`, `,`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
  c: 3,
};
const b = $( "get_obj1", a );
const c = b.a;
const d = [ "a" ];
const e = $objPatternRest( b, d, "rest1" );
$( "a1", c );
const f = e.b;
$( "rest1_b", f );
const g = e.c;
$( "rest1_c", g );
const h = "a" in e;
$( "rest1_a_exists", h );
const i = { x: 10 };
const j = $( "get_obj2", i );
const k = j.x;
const l = j.y;
let m = undefined;
const n = l === undefined;
if (n) {
  m = $( "default_y", 20 );
}
else {
  m = l;
}
const o = [ "x", "y" ];
const p = $objPatternRest( j, o, "rest2" );
$( "x2", k );
$( "y2", m );
const q = $Object_keys( p );
const r = $dotCall( $array_join, q, "join", "," );
$( "rest2_keys", r );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let tmpCalleeParam = { a: 1, b: 2, c: 3 };
  let source1 = $(`get_obj1`, tmpCalleeParam);
  let tmpBindingPatternObjRoot = source1;
  let a = tmpBindingPatternObjRoot.a;
  let tmpCalleeParam$1 = tmpBindingPatternObjRoot;
  let tmpCalleeParam$3 = [`a`];
  let rest1 = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, `rest1`);
  $(`a1`, a);
  let tmpCalleeParam$5 = rest1.b;
  $(`rest1_b`, tmpCalleeParam$5);
  let tmpCalleeParam$7 = rest1.c;
  $(`rest1_c`, tmpCalleeParam$7);
  let tmpCalleeParam$9 = `a` in rest1;
  $(`rest1_a_exists`, tmpCalleeParam$9);
  let tmpCalleeParam$11 = { x: 10 };
  let source2 = $(`get_obj2`, tmpCalleeParam$11);
  let tmpBindingPatternObjRoot$1 = source2;
  let x = tmpBindingPatternObjRoot$1.x;
  let tmpOPBD = tmpBindingPatternObjRoot$1.y;
  let y = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    y = $(`default_y`, 20);
  } else {
    y = tmpOPBD;
  }
  let tmpCalleeParam$13 = tmpBindingPatternObjRoot$1;
  let tmpCalleeParam$15 = [`x`, `y`];
  let rest2 = $objPatternRest(tmpCalleeParam$13, tmpCalleeParam$15, `rest2`);
  $(`x2`, x);
  $(`y2`, y);
  const tmpMCF = $Object_keys;
  const tmpMCOO = $Object_keys(rest2);
  const tmpMCF$1 = tmpMCOO.join;
  let tmpCalleeParam$17 = $dotCall(tmpMCF$1, tmpMCOO, `join`, `,`);
  $(`rest2_keys`, tmpCalleeParam$17);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_join
- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $Object_keys


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj1', { a: '1', b: '2', c: '3' }
 - 2: 'a1', undefined
 - 3: 'rest1_b', undefined
 - 4: 'rest1_c', undefined
 - 5: 'rest1_a_exists', false
 - 6: 'get_obj2', { x: '10' }
 - 7: 'default_y', 20
 - 8: 'x2', undefined
 - 9: 'y2', 'default_y'
 - 10: 'rest2_keys', '0,1,2,3,4,5,6,7'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
