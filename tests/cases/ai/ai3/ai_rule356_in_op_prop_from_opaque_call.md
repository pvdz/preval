# Preval test case

# ai_rule356_in_op_prop_from_opaque_call.md

> Ai > Ai3 > Ai rule356 in op prop from opaque call
>
> Test: 'in' operator with property name from opaque call and opaque object.

## Input

`````js filename=intro
// Expected: let r = ($('getP')()) in $('getO'); $('res', r);
let obj = $('getObject', {a:1, b:2});
let propName = $('getPropName', () => 'a'); // Opaque call returning property name string
let result = propName() in obj;
$('final_result', result);

let propName2 = $('getNonExistPropName', () => 'c');
let result2 = propName2() in obj;
$('final_result2', result2);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const obj /*:unknown*/ = $(`getObject`, tmpCalleeParam);
const tmpCalleeParam$1 /*:()=>string*/ = function () {
  debugger;
  return `a`;
};
const propName /*:unknown*/ = $(`getPropName`, tmpCalleeParam$1);
const tmpBinLhs /*:unknown*/ = propName();
const result /*:boolean*/ = tmpBinLhs in obj;
$(`final_result`, result);
const tmpCalleeParam$3 /*:()=>string*/ = function () {
  debugger;
  return `c`;
};
const propName2 /*:unknown*/ = $(`getNonExistPropName`, tmpCalleeParam$3);
const tmpBinLhs$1 /*:unknown*/ = propName2();
const result2 /*:boolean*/ = tmpBinLhs$1 in obj;
$(`final_result2`, result2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`getObject`, { a: 1, b: 2 });
const propName = $(`getPropName`, function () {
  return `a`;
});
$(`final_result`, propName() in obj);
const propName2 = $(`getNonExistPropName`, function () {
  return `c`;
});
$(`final_result2`, propName2() in obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = $( "getObject", a );
const c = function() {
  debugger;
  return "a";
};
const d = $( "getPropName", c );
const e = d();
const f = e in b;
$( "final_result", f );
const g = function() {
  debugger;
  return "c";
};
const h = $( "getNonExistPropName", g );
const i = h();
const j = i in b;
$( "final_result2", j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: 1, b: 2 };
let obj = $(`getObject`, tmpCalleeParam);
let tmpCalleeParam$1 = function () {
  debugger;
  return `a`;
};
let propName = $(`getPropName`, tmpCalleeParam$1);
const tmpBinLhs = propName();
let result = tmpBinLhs in obj;
$(`final_result`, result);
let tmpCalleeParam$3 = function () {
  debugger;
  return `c`;
};
let propName2 = $(`getNonExistPropName`, tmpCalleeParam$3);
const tmpBinLhs$1 = propName2();
let result2 = tmpBinLhs$1 in obj;
$(`final_result2`, result2);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'getObject', { a: '1', b: '2' }
 - 2: 'getPropName', '<function>'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
