# Preval test case

# ctxt_cmp_opt_c_undef_b.md

> Normalize > Optional > Ctxt cmp opt c undef b
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {};
$($(a)[$('b')][$('c')]?.(100));
`````

## Settled


`````js filename=intro
const a /*:object*/ = {};
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpChainRootComputed /*:unknown*/ = $(`b`);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
const tmpChainRootComputed$1 /*:unknown*/ = $(`c`);
const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
const tmpIfTest /*:boolean*/ = tmpChainElementObject$1 == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
  $(tmpChainElementCall$1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpChainElementCall = $({});
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpChainRootComputed$1 = $(`c`);
const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
if (tmpChainElementObject$1 == null) {
  $(undefined);
} else {
  $($dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100));
}
`````

## Pre Normal


`````js filename=intro
const a = {};
$($(a)[$(`b`)][$(`c`)]?.(100));
`````

## Normalized


`````js filename=intro
const a = {};
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpChainRootComputed$1 = $(`c`);
const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
const tmpIfTest = tmpChainElementObject$1 != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
  tmpCalleeParam = tmpChainElementCall$1;
  $(tmpChainElementCall$1);
} else {
  $(tmpCalleeParam);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( a );
const c = $( "b" );
const d = b[ c ];
const e = $( "c" );
const f = d[ e ];
const g = f == null;
if (g) {
  $( undefined );
}
else {
  const h = $dotCall( f, d, undefined, 100 );
  $( h );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: {}
 - 2: 'b'
 - 3: 'c'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
