# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("$")]?.($(1))) || (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ /*ternaryConst*/ = undefined;
const b /*:object*/ = { $: $ };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`\$`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    a = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$1);
  }
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$3 /*:unknown*/ = $(b);
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$3) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`\$`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$5) {
      $(undefined);
      $(undefined);
    } else {
      const tmpCalleeParam$3 /*:unknown*/ = $(1);
      const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, tmpCalleeParam$3);
      $(tmpNestedComplexRhs);
      $(tmpNestedComplexRhs);
    }
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { $: $ };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    a = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
  }
}
if (a) {
  $(a);
  $(a);
} else {
  const tmpChainElementCall$3 = $(b);
  if (tmpChainElementCall$3 == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed$1 = $(`\$`);
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    if (tmpChainElementObject$1 == null) {
      $(undefined);
      $(undefined);
    } else {
      const tmpNestedComplexRhs = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, $(1));
      $(tmpNestedComplexRhs);
      $(tmpNestedComplexRhs);
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { $: $ };
const c = $( b );
const d = c == null;
if (d) {

}
else {
  const e = $( "$" );
  const f = c[ e ];
  const g = f == null;
  if (g) {

  }
  else {
    const h = $( 1 );
    a = $dotCall( f, c, undefined, h );
  }
}
if (a) {
  $( a );
  $( a );
}
else {
  const i = $( b );
  const j = i == null;
  if (j) {
    $( undefined );
    $( undefined );
  }
  else {
    const k = $( "$" );
    const l = i[ k ];
    const m = l == null;
    if (m) {
      $( undefined );
      $( undefined );
    }
    else {
      const n = $( 1 );
      const o = $dotCall( l, i, undefined, n );
      $( o );
      $( o );
    }
  }
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
