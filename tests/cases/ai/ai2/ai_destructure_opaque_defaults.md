# Preval test case

# ai_destructure_opaque_defaults.md

> Ai > Ai2 > Ai destructure opaque defaults
>
> Test: Destructuring assignment from opaque object with default values.

## Input

`````js filename=intro
// Expected: let { a = $('default_a'), b = 'default_b' } = $('source'); (or equivalent normalized form)
let source = $('opaque_source_object');
let { prop1 = $('default_for_prop1'), prop2 = 'default_for_prop2', prop3 } = source;
$('values', prop1, prop2, prop3);
`````


## Settled


`````js filename=intro
const source /*:unknown*/ = $(`opaque_source_object`);
const tmpOPBD /*:unknown*/ = source.prop1;
let prop1 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  prop1 = $(`default_for_prop1`);
} else {
  prop1 = tmpOPBD;
}
const tmpOPBD$1 /*:unknown*/ = source.prop2;
let prop2 /*:unknown*/ /*ternaryConst*/ = `default_for_prop2`;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD$1 === undefined;
if (tmpIfTest$1) {
} else {
  prop2 = tmpOPBD$1;
}
const prop3 /*:unknown*/ = source.prop3;
$(`values`, prop1, prop2, prop3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const source = $(`opaque_source_object`);
const tmpOPBD = source.prop1;
let prop1 = undefined;
if (tmpOPBD === undefined) {
  prop1 = $(`default_for_prop1`);
} else {
  prop1 = tmpOPBD;
}
const tmpOPBD$1 = source.prop2;
let prop2 = `default_for_prop2`;
if (!(tmpOPBD$1 === undefined)) {
  prop2 = tmpOPBD$1;
}
$(`values`, prop1, prop2, source.prop3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_source_object" );
const b = a.prop1;
let c = undefined;
const d = b === undefined;
if (d) {
  c = $( "default_for_prop1" );
}
else {
  c = b;
}
const e = a.prop2;
let f = "default_for_prop2";
const g = e === undefined;
if (g) {

}
else {
  f = e;
}
const h = a.prop3;
$( "values", c, f, h );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let source = $(`opaque_source_object`);
let tmpBindingPatternObjRoot = source;
let tmpOPBD = tmpBindingPatternObjRoot.prop1;
let prop1 = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  prop1 = $(`default_for_prop1`);
} else {
  prop1 = tmpOPBD;
}
let tmpOPBD$1 = tmpBindingPatternObjRoot.prop2;
let prop2 = undefined;
const tmpIfTest$1 = tmpOPBD$1 === undefined;
if (tmpIfTest$1) {
  prop2 = `default_for_prop2`;
} else {
  prop2 = tmpOPBD$1;
}
let prop3 = tmpBindingPatternObjRoot.prop3;
$(`values`, prop1, prop2, prop3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_source_object'
 - 2: 'default_for_prop1'
 - 3: 'values', 'default_for_prop1', 'default_for_prop2', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
