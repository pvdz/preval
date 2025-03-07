# Preval test case

# ctxt_cmp_opt_ab_pass.md

> Normalize > Optional > Ctxt cmp opt ab pass
>
> Ensure context is passed on properly in various optional chaining cases

## Input

`````js filename=intro
const a = {b: {c: $}};
$($(a)?.[$('b')]?.[$('c')](100));
`````

## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = undefined;
const tmpObjLitVal /*:object*/ = { c: $ };
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
const tmpObjLitVal = { c: $ };
const tmpChainElementCall = $({ b: tmpObjLitVal });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    const tmpChainRootComputed$1 = $(`c`);
    tmpCalleeParam = tmpChainElementObject[tmpChainRootComputed$1](undefined, 100);
  }
}
$(tmpCalleeParam);
`````

## Pre Normal


`````js filename=intro
const a = { b: { c: $ } };
$($(a)?.[$(`b`)]?.[$(`c`)](100));
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = { c: $ };
const a = { b: tmpObjLitVal };
let tmpCalleeParam = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(a);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed$1 = $(`c`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
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
const b = { c: $ };
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
    const k = $dotCall( j, g, undefined, 100 );
    a = k;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { b: '{"c":"\\"<$>\\""}' }
 - 2: 'b'
 - 3: 'c'
 - 4: 100
 - 5: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: BAD!!
 - 1: { b: '{"c":"\\"<$>\\""}' }
 - 2: 'b'
 - 3: 'c'
 - 4: undefined, 100
 - 5: undefined
 - eval returned: undefined
