# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b)?.[$("$")]?.($(1)))) {}
$(f());
$(a);
`````


## Settled


`````js filename=intro
const b /*:object*/ /*truthy*/ = { $: $ };
const tmpChainElementCall /*:unknown*/ = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
  $(undefined);
  $(undefined);
} else {
  const tmpChainRootComputed /*:unknown*/ = $(`\$`);
  const tmpChainElementObject /*:unknown*/ = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$3) {
    $(undefined);
    $(undefined);
  } else {
    const tmpCalleeParam /*:unknown*/ = $(1);
    const tmpClusterSSA_tmpNestedComplexRhs /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
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
    const tmpClusterSSA_tmpNestedComplexRhs = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
    $(undefined);
    $(tmpClusterSSA_tmpNestedComplexRhs);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b == null;
if (c) {
  $( undefined );
  $( undefined );
}
else {
  const d = $( "$" );
  const e = b[ d ];
  const f = e == null;
  if (f) {
    $( undefined );
    $( undefined );
  }
  else {
    const g = $( 1 );
    const h = $dotCall( e, b, undefined, g );
    $( undefined );
    $( h );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
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
        let tmpCalleeParam = $(1);
        const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
        tmpNestedComplexRhs = tmpChainElementCall$1;
      } else {
      }
    } else {
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
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
 - 5: undefined
 - 6: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
