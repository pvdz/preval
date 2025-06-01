# Preval test case

# ai_rule291_object_define_property_opaque_descriptor.md

> Ai > Ai3 > Ai rule291 object define property opaque descriptor
>
> Test: Object.defineProperty with an opaque property descriptor.

## Input

`````js filename=intro
// Expected: Object.defineProperty(obj, 'prop', desc); (or equivalent, call preserved)
const obj = {};
let desc = $('desc', { value: 42, writable: true });
$('result', Object.defineProperty(obj, 'prop', desc));
let val = $('val', obj.prop);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { value: 42, writable: true };
const desc /*:unknown*/ = $(`desc`, tmpCalleeParam);
const obj /*:object*/ = {};
const tmpCalleeParam$1 /*:object*/ = $Object_defineProperty(obj, `prop`, desc);
$(`result`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = obj.prop;
$(`val`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const desc = $(`desc`, { value: 42, writable: true });
const obj = {};
$(`result`, $Object_defineProperty(obj, `prop`, desc));
$(`val`, obj.prop);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  value: 42,
  writable: true,
};
const b = $( "desc", a );
const c = {};
const d = $Object_defineProperty( c, "prop", b );
$( "result", d );
const e = c.prop;
$( "val", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = {};
let tmpCalleeParam = { value: 42, writable: true };
let desc = $(`desc`, tmpCalleeParam);
const tmpMCF = $Object_defineProperty;
let tmpCalleeParam$1 = $Object_defineProperty(obj, `prop`, desc);
$(`result`, tmpCalleeParam$1);
let tmpCalleeParam$3 = obj.prop;
let val = $(`val`, tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_defineProperty


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'desc', { value: '42', writable: 'true' }
 - eval returned: ('<crash[ Property description must be an object: desc ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
