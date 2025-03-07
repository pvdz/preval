# Preval test case

# ctxt_cmp_opt_b_undef_c.md

> Normalize > Optional > Ctxt cmp opt b undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a)[$('b')]?.[$('c')](100));
`````

## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ = {};
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainRootComputed /*:unknown*/ = $(`b`);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainRootComputed$1 /*:unknown*/ = $(`c`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
  $(tmpChainElementCall$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = {};
const tmpChainElementCall = $({ b: tmpObjLitVal });
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
if (tmpChainElementObject == null) {
  $(undefined);
} else {
  const tmpChainRootComputed$1 = $(`c`);
  $(tmpChainElementObject[tmpChainRootComputed$1](undefined, 100));
}
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$($(a)[$(`b`)]?.[$(`c`)](100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
  tmpCalleeParam = tmpChainElementCall$1;
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = { b: a };
const c = $( b );
const d = $( "b" );
const e = c[ d ];
const f = e == null;
if (f) {
  $( undefined );
}
else {
  const g = $( "c" );
  const h = e[ g ];
  const i = $dotCall( h, e, undefined, 100 );
  $( i );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { b: '{}' }
 - 2: 'b'
 - 3: 'c'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: BAD!?
 - 1: { b: '{}' }
 - 2: 'b'
 - 3: 'c'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Post settled calls: BAD!!
 - 1: { b: '{}' }
 - 2: 'b'
 - 3: 'c'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Denormalized calls: Same
