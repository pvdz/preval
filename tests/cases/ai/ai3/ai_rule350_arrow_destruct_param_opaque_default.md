# Preval test case

# ai_rule350_arrow_destruct_param_opaque_default.md

> Ai > Ai3 > Ai rule350 arrow destruct param opaque default
>
> Test: Arrow function with destructuring in parameters and opaque defaults.

## Input

`````js filename=intro
// Expected: const f = ({a = $('defA'), b = $('defB')} = {}) => { $('res', a, b); }; f($('src'));
const func = ({ a = $('defaultA'), b = $('defaultB') } = $('defaultSource', {})) => {
  $('inside_func', a, b);
};
func($('sourceObj', { a: 'valA' }));
func(); // Test with defaults from parameter initializer
func(undefined); // Test with defaults from parameter initializer
func({}); // Test with defaults from destructuring
func({b: 'valBOnly'}); // Test with one defined, one default from destructuring
`````


## Settled


`````js filename=intro
const func /*:(unknown)=>undefined*/ = function ($$0) {
  const tmpParamBare /*:unknown*/ = $$0;
  debugger;
  let tmpBindingPatternObjRoot /*:unknown*/ /*ternaryConst*/ = undefined;
  const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam /*:object*/ = {};
    tmpBindingPatternObjRoot = $(`defaultSource`, tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  const tmpOPBD /*:unknown*/ = tmpBindingPatternObjRoot.a;
  let a /*:unknown*/ /*ternaryConst*/ = undefined;
  const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    a = $(`defaultA`);
  } else {
    a = tmpOPBD;
  }
  const tmpOPBD$1 /*:unknown*/ = tmpBindingPatternObjRoot.b;
  const tmpIfTest$3 /*:boolean*/ = tmpOPBD$1 === undefined;
  if (tmpIfTest$3) {
    const tmpClusterSSA_b /*:unknown*/ = $(`defaultB`);
    $(`inside_func`, a, tmpClusterSSA_b);
    return undefined;
  } else {
    $(`inside_func`, a, tmpOPBD$1);
    return undefined;
  }
};
const tmpCalleeParam$3 /*:object*/ = { a: `valA` };
const tmpCalleeParam$1 /*:unknown*/ = $(`sourceObj`, tmpCalleeParam$3);
func(tmpCalleeParam$1);
func();
func(undefined);
const tmpCalleeParam$5 /*:object*/ = {};
func(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:object*/ = { b: `valBOnly` };
func(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const func = function (tmpParamBare) {
  let tmpBindingPatternObjRoot = undefined;
  if (tmpParamBare === undefined) {
    tmpBindingPatternObjRoot = $(`defaultSource`, {});
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  const tmpOPBD = tmpBindingPatternObjRoot.a;
  let a = undefined;
  if (tmpOPBD === undefined) {
    a = $(`defaultA`);
  } else {
    a = tmpOPBD;
  }
  const tmpOPBD$1 = tmpBindingPatternObjRoot.b;
  if (tmpOPBD$1 === undefined) {
    $(`inside_func`, a, $(`defaultB`));
  } else {
    $(`inside_func`, a, tmpOPBD$1);
  }
};
func($(`sourceObj`, { a: `valA` }));
func();
func(undefined);
func({});
func({ b: `valBOnly` });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  let c = undefined;
  const d = b === undefined;
  if (d) {
    const e = {};
    c = $( "defaultSource", e );
  }
  else {
    c = b;
  }
  const f = c.a;
  let g = undefined;
  const h = f === undefined;
  if (h) {
    g = $( "defaultA" );
  }
  else {
    g = f;
  }
  const i = c.b;
  const j = i === undefined;
  if (j) {
    const k = $( "defaultB" );
    $( "inside_func", g, k );
    return undefined;
  }
  else {
    $( "inside_func", g, i );
    return undefined;
  }
};
const l = { a: "valA" };
const m = $( "sourceObj", l );
a( m );
a();
a( undefined );
const n = {};
a( n );
const o = { b: "valBOnly" };
a( o );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const func = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = {};
    tmpBindingPatternObjRoot = $(`defaultSource`, tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.a;
  let a = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    a = $(`defaultA`);
  } else {
    a = tmpOPBD;
  }
  let tmpOPBD$1 = tmpBindingPatternObjRoot.b;
  let b = undefined;
  const tmpIfTest$3 = tmpOPBD$1 === undefined;
  if (tmpIfTest$3) {
    b = $(`defaultB`);
    $(`inside_func`, a, b);
    return undefined;
  } else {
    b = tmpOPBD$1;
    $(`inside_func`, a, tmpOPBD$1);
    return undefined;
  }
};
const tmpCallCallee = func;
let tmpCalleeParam$3 = { a: `valA` };
let tmpCalleeParam$1 = $(`sourceObj`, tmpCalleeParam$3);
func(tmpCalleeParam$1);
func();
func(undefined);
const tmpCallCallee$1 = func;
let tmpCalleeParam$5 = {};
func(tmpCalleeParam$5);
const tmpCallCallee$3 = func;
let tmpCalleeParam$7 = { b: `valBOnly` };
func(tmpCalleeParam$7);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'sourceObj', { a: '"valA"' }
 - 2: 'defaultA'
 - 3: 'defaultB'
 - 4: 'inside_func', 'defaultA', 'defaultB'
 - 5: 'defaultSource', {}
 - 6: 'defaultA'
 - 7: 'defaultB'
 - 8: 'inside_func', 'defaultA', 'defaultB'
 - 9: 'defaultSource', {}
 - 10: 'defaultA'
 - 11: 'defaultB'
 - 12: 'inside_func', 'defaultA', 'defaultB'
 - 13: 'defaultA'
 - 14: 'defaultB'
 - 15: 'inside_func', 'defaultA', 'defaultB'
 - 16: 'defaultA'
 - 17: 'inside_func', 'defaultA', 'valBOnly'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
