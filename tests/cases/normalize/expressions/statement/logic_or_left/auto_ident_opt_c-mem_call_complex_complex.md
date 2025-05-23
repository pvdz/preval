# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Logic or left > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)?.[$("$")]?.($(1)) || $(100);
$(a);
`````


## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ /*ternaryConst*/ = undefined;
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
    const tmpCalleeParam /*:unknown*/ = $(1);
    tmpIfTest = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam);
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(100);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const tmpChainElementCall = $({ $: $ });
if (!(tmpChainElementCall == null)) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  if (!(tmpChainElementObject == null)) {
    tmpIfTest = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, $(1));
  }
}
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  $(100);
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
    a = $dotCall( f, c, undefined, h );
  }
}
const i = {
  a: 999,
  b: 1000,
};
if (a) {
  $( i );
}
else {
  $( 100 );
  $( i );
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
