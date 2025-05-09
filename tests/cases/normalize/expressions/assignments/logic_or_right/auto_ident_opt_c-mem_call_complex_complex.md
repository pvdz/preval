# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic or right > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) || (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
} else {
  let tmpNestedComplexRhs /*:unknown*/ = undefined;
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
      tmpNestedComplexRhs = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$1);
    }
  }
  const tmpClusterSSA_a /*:unknown*/ = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(tmpClusterSSA_a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
} else {
  let tmpNestedComplexRhs = undefined;
  const tmpChainElementCall = $({ $: $ });
  if (!(tmpChainElementCall == null)) {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (!(tmpChainElementObject == null)) {
      tmpNestedComplexRhs = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
    }
  }
  const tmpClusterSSA_a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
  $(tmpClusterSSA_a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( a );
  const b = {
    a: 999,
    b: 1000,
  };
  $( b );
}
else {
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
      c = $dotCall( h, e, undefined, j );
    }
  }
  const k = c;
  $( c );
  $( k );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
