# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Switch case top > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  case $(1):
    a = $(b)?.[$("$")]?.($(1));
}
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(1);
const tmpIfTest /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
    $(undefined);
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`\$`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
    if (tmpIfTest$3) {
      $(undefined);
    } else {
      const tmpCalleeParam /*:unknown*/ = $(1);
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
      $(tmpChainElementCall$1);
    }
  }
} else {
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1) === $(1)) {
  const tmpChainElementCall = $({ $: $ });
  if (tmpChainElementCall == null) {
    $(undefined);
  } else {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (tmpChainElementObject == null) {
      $(undefined);
    } else {
      $($dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1)));
    }
  }
} else {
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = a === b;
if (c) {
  const d = { $: $ };
  const e = $( d );
  const f = e == null;
  if (f) {
    $( undefined );
  }
  else {
    const g = $( "$" );
    const h = e[ g ];
    const i = h == null;
    if (i) {
      $( undefined );
    }
    else {
      const j = $( 1 );
      const k = $dotCall( h, e, undefined, j );
      $( k );
    }
  }
}
else {
  const l = {
    a: 999,
    b: 1000,
  };
  $( l );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { $: '"<$>"' }
 - 4: '$'
 - 5: 1
 - 6: 1
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
