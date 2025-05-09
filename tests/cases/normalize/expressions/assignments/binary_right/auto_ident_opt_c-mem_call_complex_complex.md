# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$($(100) + (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
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
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    a = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$1);
  }
}
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothLhs = $(100);
let a = undefined;
const tmpChainElementCall = $({ $: $ });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    a = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
  }
}
$(tmpBinBothLhs + a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
const c = { $: $ };
const d = $( c );
const e = d == null;
if (e) {

}
else {
  const f = $( "$" );
  const g = d[ f ];
  const h = g == null;
  if (h) {

  }
  else {
    const i = $( 1 );
    b = $dotCall( g, d, undefined, i );
  }
}
const j = a + b;
$( j );
$( b );
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
 - 6: 101
 - 7: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
