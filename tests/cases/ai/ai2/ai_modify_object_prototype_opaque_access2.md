# Preval test case

# ai_modify_object_prototype_opaque_access2.md

> Ai > Ai2 > Ai modify object prototype opaque access2
>
> Test: Opaquely modify Object.prototype, then access props.

(prove that the catch value can be falsy...)
Rest is to prevent optimizing away everything.

## Input

`````js filename=intro
let protoKey = $('op_proto_key_name', 'newProtoPropOnObject');

function t() { throw 0 }

try {
  if ($) t()
} finally {
  $('op_proto_cleanup_done', !Object.prototype.hasOwnProperty(protoKey) || Object.prototype[protoKey] === originalProtoProperty);
}
`````


## Settled


`````js filename=intro
const protoKey /*:unknown*/ = $(`op_proto_key_name`, `newProtoPropOnObject`);
let $implicitThrow /*:boolean: false | true*/ /*ternaryConst*/ = false;
let $finalCatchArg /*:primitive: 0 | undefined*/ /*ternaryConst*/ /*falsy*/ = undefined;
if ($) {
  $implicitThrow = true;
  $finalCatchArg = 0;
} else {
}
const tmpUnaryArg /*:boolean*/ = $dotCall($object_hasOwnProperty, $Object_prototype, `hasOwnProperty`, protoKey);
if (tmpUnaryArg) {
  const tmpBinLhs /*:unknown*/ = $Object_prototype[protoKey];
  const tmpClusterSSA_tmpCalleeParam /*:boolean*/ = tmpBinLhs === originalProtoProperty;
  $(`op_proto_cleanup_done`, tmpClusterSSA_tmpCalleeParam);
} else {
  $(`op_proto_cleanup_done`, true);
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const protoKey = $(`op_proto_key_name`, `newProtoPropOnObject`);
let $implicitThrow = false;
let $finalCatchArg = undefined;
if ($) {
  $implicitThrow = true;
  $finalCatchArg = 0;
}
if ($dotCall($object_hasOwnProperty, $Object_prototype, `hasOwnProperty`, protoKey)) {
  $(`op_proto_cleanup_done`, $Object_prototype[protoKey] === originalProtoProperty);
} else {
  $(`op_proto_cleanup_done`, true);
}
if ($implicitThrow) {
  throw $finalCatchArg;
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "op_proto_key_name", "newProtoPropOnObject" );
let b = false;
let c = undefined;
if ($) {
  b = true;
  c = 0;
}
const d = $dotCall( $object_hasOwnProperty, $Object_prototype, "hasOwnProperty", a );
if (d) {
  const e = $Object_prototype[ a ];
  const f = e === originalProtoProperty;
  $( "op_proto_cleanup_done", f );
}
else {
  $( "op_proto_cleanup_done", true );
}
if (b) {
  throw c;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let t = function () {
  debugger;
  throw 0;
};
let protoKey = $(`op_proto_key_name`, `newProtoPropOnObject`);
let $implicitThrow = false;
let $finalCatchArg = undefined;
try {
  if ($) {
    t();
  } else {
  }
} catch ($finalImplicit) {
  $implicitThrow = true;
  $finalCatchArg = $finalImplicit;
}
const tmpMCOO = $Object_prototype;
const tmpMCF = tmpMCOO.hasOwnProperty;
const tmpUnaryArg = $dotCall(tmpMCF, tmpMCOO, `hasOwnProperty`, protoKey);
let tmpCalleeParam = !tmpUnaryArg;
if (tmpCalleeParam) {
  $(`op_proto_cleanup_done`, tmpCalleeParam);
} else {
  const tmpCompObj = $Object_prototype;
  const tmpBinLhs = tmpCompObj[protoKey];
  tmpCalleeParam = tmpBinLhs === originalProtoProperty;
  $(`op_proto_cleanup_done`, tmpCalleeParam);
}
if ($implicitThrow) {
  throw $finalCatchArg;
} else {
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $object_hasOwnProperty


## Globals


BAD@! Found 1 implicit global bindings:

originalProtoProperty


## Runtime Outcome


Should call `$` with:
 - 1: 'op_proto_key_name', 'newProtoPropOnObject'
 - 2: 'op_proto_cleanup_done', true
 - eval returned: ('<crash[ 0 ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
