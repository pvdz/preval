# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Ternary b > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)?.[$("$")]?.($(1))) : $(200));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs /*:unknown*/ = undefined;
  const b /*:object*/ = { $: $ };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest$1) {
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`\$`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
    if (tmpIfTest$3) {
    } else {
      const tmpCalleeParam$5 /*:unknown*/ = $(1);
      const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$5);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(200);
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = { a: 999, b: 1000 };
if ($(1)) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall = $({ $: $ });
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (!(tmpChainElementObject == null)) {
      tmpNestedComplexRhs = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
    }
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $($(200));
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$($(1) ? (a = $(b)?.[$(`\$`)]?.($(1))) : $(200));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  let tmpNestedComplexRhs = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = $(b);
  const tmpIfTest$1 = tmpChainElementCall != null;
  if (tmpIfTest$1) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$3 = tmpChainElementObject != null;
    if (tmpIfTest$3) {
      const tmpCalleeParam$1 = tmpChainElementObject;
      const tmpCalleeParam$3 = tmpChainElementCall;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$1 = $dotCall(tmpCalleeParam$1, tmpCalleeParam$3, undefined, tmpCalleeParam$5);
      tmpNestedComplexRhs = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
  tmpCalleeParam = $(200);
}
$(tmpCalleeParam);
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  let c = undefined;
  const d = { $: $ };
  const e = $( d );
  const f = e == null;
  if (f) {

  }
  else {
    const g = $( "$" );
    const h = e[ g ];
    const i = h == null;
    if (i) {

    }
    else {
      const j = $( 1 );
      const k = $dotCall( h, e, undefined, j );
      c = k;
    }
  }
  a = c;
  $( c );
}
else {
  const l = $( 200 );
  $( l );
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
