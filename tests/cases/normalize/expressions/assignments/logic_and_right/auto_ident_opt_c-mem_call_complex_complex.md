# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Logic and right > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) && (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
if (tmpCalleeParam) {
  const b /*:object*/ = { $: $ };
  const tmpChainElementCall /*:unknown*/ = $(b);
  const tmpIfTest /*:boolean*/ = tmpChainElementCall == null;
  if (tmpIfTest) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed /*:unknown*/ = $(`\$`);
    const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
    const tmpIfTest$1 /*:boolean*/ = tmpChainElementObject == null;
    if (tmpIfTest$1) {
      $(undefined);
      $(undefined);
    } else {
      const tmpCalleeParam$1 /*:unknown*/ = $(1);
      const tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$1);
      $(tmpNestedComplexRhs);
      $(tmpNestedComplexRhs);
    }
  }
} else {
  $(tmpCalleeParam);
  const a /*:object*/ = { a: 999, b: 1000 };
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(100);
if (tmpCalleeParam) {
  const tmpChainElementCall = $({ $: $ });
  if (tmpChainElementCall == null) {
    $(undefined);
    $(undefined);
  } else {
    const tmpChainRootComputed = $(`\$`);
    const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
    if (tmpChainElementObject == null) {
      $(undefined);
      $(undefined);
    } else {
      const tmpNestedComplexRhs = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
      $(tmpNestedComplexRhs);
      $(tmpNestedComplexRhs);
    }
  }
} else {
  $(tmpCalleeParam);
  $({ a: 999, b: 1000 });
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = c == null;
  if (d) {
    $( undefined );
    $( undefined );
  }
  else {
    const e = $( "$" );
    const f = c[ e ];
    const g = f == null;
    if (g) {
      $( undefined );
      $( undefined );
    }
    else {
      const h = $( 1 );
      const i = $dotCall( f, c, undefined, h );
      $( i );
      $( i );
    }
  }
}
else {
  $( a );
  const j = {
    a: 999,
    b: 1000,
  };
  $( j );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
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
