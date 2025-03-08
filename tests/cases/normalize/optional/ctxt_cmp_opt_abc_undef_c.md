# Preval test case

# ctxt_cmp_opt_abc_undef_c.md

> Normalize > Optional > Ctxt cmp opt abc undef c
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {}};
$($(a)?.[$('b')]?.[$('c')]?.(100));
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = {};
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`b`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`c`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$3) {
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    }
  }
}
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpObjLitVal = {};
const tmpChainElementCall = $({ b: tmpObjLitVal });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    const tmpChainRootComputed$1 = $(`c`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    if (!(tmpChainElementObject$1 == null)) {
      tmpCalleeParam = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
    }
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = { b: {} };
$($(a)?.[$(`b`)]?.[$(`c`)]?.(100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = {};
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`c`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpIfTest$3 = tmpChainElementObject$1 != null;
    if (tmpIfTest$3) {
      const tmpChainElementCall$1 = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
      tmpCalleeParam = tmpChainElementCall$1;
    } else {
    }
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
const b = {};
const c = { b: b };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = $( "b" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( "c" );
    const j = g[ i ];
    const k = j == null;
    if (k) {

    }
    else {
      const l = $dotCall( j, g, undefined, 100 );
      a = l;
    }
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { b: '{}' }
 - 2: 'b'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
