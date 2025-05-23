# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)?.[$("$")]?.($(1)) + $(b)?.[$("$")]?.($(1));
$(a);
`````


## Settled


`````js filename=intro
let tmpBinBothLhs /*:unknown*/ /*ternaryConst*/ = undefined;
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
    const tmpCalleeParam /*:unknown*/ = $(1);
    tmpBinBothLhs = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
  }
}
let tmpBinBothRhs /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpChainElementCall$3 /*:unknown*/ = $(b);
const tmpIfTest$3 /*:boolean*/ = tmpChainElementCall$3 == null;
if (tmpIfTest$3) {
} else {
  const tmpChainRootComputed$1 /*:unknown*/ = $(`\$`);
  const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementObject$1 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$1 /*:unknown*/ = $(1);
    tmpBinBothRhs = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, tmpCalleeParam$1);
  }
}
tmpBinBothLhs + tmpBinBothRhs;
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpBinBothLhs = undefined;
const b = { $: $ };
const tmpChainElementCall = $(b);
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    tmpBinBothLhs = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
  }
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$3 = $(b);
if (!(tmpChainElementCall$3 == null)) {
  const tmpChainRootComputed$1 = $(`\$`);
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  if (!(tmpChainElementObject$1 == null)) {
    tmpBinBothRhs = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, $(1));
  }
}
tmpBinBothLhs + tmpBinBothRhs;
$({ a: 999, b: 1000 });
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
let i = undefined;
const j = $( b );
const k = j == null;
if (k) {

}
else {
  const l = $( "$" );
  const m = j[ l ];
  const n = m == null;
  if (n) {

  }
  else {
    const o = $( 1 );
    i = $dotCall( m, j, undefined, o );
  }
}
a + i;
const p = {
  a: 999,
  b: 1000,
};
$( p );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    let tmpCalleeParam = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
    tmpBinBothLhs = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = $(b);
const tmpIfTest$3 = tmpChainElementCall$3 != null;
if (tmpIfTest$3) {
  const tmpChainRootComputed$1 = $(`\$`);
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 = tmpChainElementObject$1 != null;
  if (tmpIfTest$5) {
    let tmpCalleeParam$1 = $(1);
    const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, tmpCalleeParam$1);
    tmpBinBothRhs = tmpChainElementCall$5;
  } else {
  }
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
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
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 1
 - 9: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
