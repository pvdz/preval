# Preval test case

# ctxt_cmp_opt_bc_undef_a.md

> Normalize > Optional > Ctxt cmp opt bc undef a
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = undefined;
$($(a)[$('b')]?.[$('c')]?.(100));
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpChainElementCall /*:unknown*/ = $(undefined);
const tmpChainRootComputed /*:unknown*/ = $(`b`);
const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest /*:boolean*/ = tmpChainElementObject == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed$1 /*:unknown*/ = $(`c`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementCall = $(undefined);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
if (!(tmpChainElementObject == null)) {
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  if (!(tmpChainElementObject$1 == null)) {
    tmpCalleeParam = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = undefined;
$($(a)[$(`b`)]?.[$(`c`)]?.(100));
`````

## Normalized


`````js filename=intro
const a = undefined;
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpChainRootComputed = $(`b`);
const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
const tmpIfTest = tmpChainElementObject != null;
if (tmpIfTest) {
  const tmpChainRootComputed$1 = $(`c`);
  const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
    tmpCalleeParam = tmpChainElementCall$1;
  } else {
  }
} else {
}
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( undefined );
const c = $( "b" );
const d = b[ c ];
const e = d == null;
if (e) {

}
else {
  const f = $( "c" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $dotCall( g, d, undefined, 100 );
    a = i;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: 'b'
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
