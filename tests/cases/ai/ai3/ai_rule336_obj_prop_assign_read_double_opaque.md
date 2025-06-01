# Preval test case

# ai_rule336_obj_prop_assign_read_double_opaque.md

> Ai > Ai3 > Ai rule336 obj prop assign read double opaque
>
> Test: Assign and read object property with opaque object and opaque property name.

## Input

`````js filename=intro
// Expected: let obj=$('o'); let p=$('p'); obj[p]=$('v'); $('result', obj[p]);
let obj = $('get_object');
let propKey = $('get_property_key');
let valueToAssign = $('get_value');
obj[propKey] = valueToAssign;
let readValue = obj[propKey];
$('result', readValue);
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`get_object`);
const propKey /*:unknown*/ = $(`get_property_key`);
const valueToAssign /*:unknown*/ = $(`get_value`);
obj[propKey] = valueToAssign;
const readValue /*:unknown*/ = obj[propKey];
$(`result`, readValue);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`get_object`);
const propKey = $(`get_property_key`);
const valueToAssign = $(`get_value`);
obj[propKey] = valueToAssign;
$(`result`, obj[propKey]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_object" );
const b = $( "get_property_key" );
const c = $( "get_value" );
a[b] = c;
const d = a[ b ];
$( "result", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = $(`get_object`);
let propKey = $(`get_property_key`);
let valueToAssign = $(`get_value`);
obj[propKey] = valueToAssign;
let readValue = obj[propKey];
$(`result`, readValue);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_object'
 - 2: 'get_property_key'
 - 3: 'get_value'
 - eval returned: ("<crash[ Cannot create property 'get_property_key' on string 'get_object' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
