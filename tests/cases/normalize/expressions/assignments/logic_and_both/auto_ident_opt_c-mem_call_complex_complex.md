# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("$")]?.($(1))) && (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
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
    const tmpCalleeParam$5 /*:unknown*/ = $(1);
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$5);
    a = tmpChainElementCall$1;
  }
}
const tmpCalleeParam /*:unknown*/ = a;
if (a) {
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
      const tmpCalleeParam$11 /*:unknown*/ = $(1);
      const tmpChainElementCall$5 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, tmpCalleeParam$11);
      $(tmpChainElementCall$5);
      $(tmpChainElementCall$5);
    }
  }
} else {
  $(tmpCalleeParam);
  $(a);
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
const tmpCalleeParam = a;
if (a) {
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
      const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, $(1));
      $(tmpChainElementCall$5);
      $(tmpChainElementCall$5);
    }
  }
} else {
  $(tmpCalleeParam);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = $(b)?.[$(`\$`)]?.($(1))) && (a = $(b)?.[$(`\$`)]?.($(1))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = tmpChainElementObject;
    const tmpCalleeParam$3 = tmpChainElementCall;
    const tmpCalleeParam$5 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpCalleeParam$1, tmpCalleeParam$3, undefined, tmpCalleeParam$5);
    a = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = $(b);
  const tmpIfTest$3 = tmpChainElementCall$3 != null;
  if (tmpIfTest$3) {
    const tmpChainRootComputed$1 = $(`\$`);
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$5 = tmpChainElementObject$1 != null;
    if (tmpIfTest$5) {
      const tmpCalleeParam$7 = tmpChainElementObject$1;
      const tmpCalleeParam$9 = tmpChainElementCall$3;
      const tmpCalleeParam$11 = $(1);
      const tmpChainElementCall$5 = $dotCall(tmpCalleeParam$7, tmpCalleeParam$9, undefined, tmpCalleeParam$11);
      tmpNestedComplexRhs = tmpChainElementCall$5;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(a);
} else {
  $(tmpCalleeParam);
  $(a);
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
    const i = $dotCall( f, c, undefined, h );
    a = i;
  }
}
const j = a;
if (a) {
  const k = $( b );
  const l = k == null;
  if (l) {
    $( undefined );
    $( undefined );
  }
  else {
    const m = $( "$" );
    const n = k[ m ];
    const o = n == null;
    if (o) {
      $( undefined );
      $( undefined );
    }
    else {
      const p = $( 1 );
      const q = $dotCall( n, k, undefined, p );
      $( q );
      $( q );
    }
  }
}
else {
  $( j );
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
