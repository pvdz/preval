# Preval test case

# ai_rule321_opt_chain_call_opaque_prop.md

> Ai > Ai3 > Ai rule321 opt chain call opaque prop
>
> Test: Optional chaining on a function call result with opaque function and property.

## Input

`````js filename=intro
// Expected: let x = $('get_obj')($('arg'))?.[$('get_prop')]; $('result', x);
let objMaker = $('get_obj');
let arg = $('arg');
let propName = $('get_prop');
let x = objMaker(arg)?.[propName];
$('result', x);
`````


## Settled


`````js filename=intro
const objMaker /*:unknown*/ = $(`get_obj`);
const arg /*:unknown*/ = $(`arg`);
const propName /*:unknown*/ = $(`get_prop`);
const tmpChainElementCall /*:unknown*/ = objMaker(arg);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(`result`, undefined);
} else {
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[propName];
  $(`result`, tmpChainElementObject);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objMaker = $(`get_obj`);
const arg = $(`arg`);
const propName = $(`get_prop`);
const tmpChainElementCall = objMaker(arg);
if (tmpChainElementCall == null) {
  $(`result`, undefined);
} else {
  $(`result`, tmpChainElementCall[propName]);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_obj" );
const b = $( "arg" );
const c = $( "get_prop" );
const d = a( b );
const e = d == null;
if (e) {
  $( "result", undefined );
}
else {
  const f = d[ c ];
  $( "result", f );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let objMaker = $(`get_obj`);
let arg = $(`arg`);
let propName = $(`get_prop`);
let x = undefined;
const tmpChainRootCall = objMaker;
const tmpChainElementCall = objMaker(arg);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = propName;
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  x = tmpChainElementObject;
  $(`result`, tmpChainElementObject);
} else {
  $(`result`, x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj'
 - 2: 'arg'
 - 3: 'get_prop'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
