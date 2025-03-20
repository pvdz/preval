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
const tmpObjLitVal /*:object*/ = {};
const a /*:object*/ = { b: tmpObjLitVal };
const tmpChainElementCall /*:unknown*/ = $(a);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`b`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`c`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementObject[tmpChainRootComputed$1];
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$3) {
      $(undefined);
    } else {
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100);
      $(tmpChainElementCall$1);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = {};
const tmpChainElementCall = $({ b: tmpObjLitVal });
if (tmpChainElementCall == null) {
  $(undefined);
} else {
  const tmpChainRootComputed = $(`b`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (tmpChainElementObject == null) {
    $(undefined);
  } else {
    const tmpChainRootComputed$1 = $(`c`);
    const tmpChainElementObject$1 = tmpChainElementObject[tmpChainRootComputed$1];
    if (tmpChainElementObject$1 == null) {
      $(undefined);
    } else {
      $($dotCall(tmpChainElementObject$1, tmpChainElementObject, undefined, 100));
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = { b: a };
const c = $( b );
const d = c == null;
if (d) {
  $( undefined );
}
else {
  const e = $( "b" );
  const f = c[ e ];
  const g = f == null;
  if (g) {
    $( undefined );
  }
  else {
    const h = $( "c" );
    const i = f[ h ];
    const j = i == null;
    if (j) {
      $( undefined );
    }
    else {
      const k = $dotCall( i, f, undefined, 100 );
      $( k );
    }
  }
}
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
