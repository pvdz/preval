# Preval test case

# ai_rule290_has_own_property_opaque_name.md

> Ai > Ai3 > Ai rule290 has own property opaque name
>
> Test: obj.hasOwnProperty($('propName')) with an opaque property name.

## Input

`````js filename=intro
// Expected: $result = obj.hasOwnProperty(P); (or equivalent with temp vars)
const obj = { foo: 1, bar: 2 };
let P = $('P', "foo");
let result = $('result', obj.hasOwnProperty(P));
`````


## Settled


`````js filename=intro
const P /*:unknown*/ = $(`P`, `foo`);
const obj /*:object*/ = { foo: 1, bar: 2 };
const tmpCalleeParam /*:boolean*/ = $dotCall($object_hasOwnProperty, obj, `hasOwnProperty`, P);
$(`result`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const P = $(`P`, `foo`);
$(`result`, $dotCall($object_hasOwnProperty, { foo: 1, bar: 2 }, `hasOwnProperty`, P));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "P", "foo" );
const b = {
  foo: 1,
  bar: 2,
};
const c = $dotCall( $object_hasOwnProperty, b, "hasOwnProperty", a );
$( "result", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { foo: 1, bar: 2 };
let P = $(`P`, `foo`);
const tmpMCF = obj.hasOwnProperty;
let tmpCalleeParam = $dotCall(tmpMCF, obj, `hasOwnProperty`, P);
let result = $(`result`, tmpCalleeParam);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $object_hasOwnProperty
- (todo) type trackeed tricks can possibly support static $object_hasOwnProperty


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'P', 'foo'
 - 2: 'result', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
