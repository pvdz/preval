# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Logic or both > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b)?.[$("$")]?.($(1)) || $(b)?.[$("$")]?.($(1));
$(a);
`````

## Settled


`````js filename=intro
let tmpIfTest /*:unknown*/ = undefined;
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
    const tmpCalleeParam$3 /*:unknown*/ = $(1);
    const tmpChainElementCall$1 /*:unknown*/ = $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$3);
    tmpIfTest = tmpChainElementCall$1;
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainElementCall$3 /*:unknown*/ = $(b);
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$5) {
    $(a);
  } else {
    const tmpChainRootComputed$1 /*:unknown*/ = $(`\$`);
    const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$7 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$7) {
      $(a);
    } else {
      const tmpCalleeParam$9 /*:unknown*/ = $(1);
      $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, tmpCalleeParam$9);
      $(a);
    }
  }
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpIfTest = undefined;
const b = { $: $ };
const tmpChainElementCall = $(b);
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
  const tmpChainElementCall$3 = $(b);
  if (tmpChainElementCall$3 == null) {
    $(a);
  } else {
    const tmpChainRootComputed$1 = $(`\$`);
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    if (tmpChainElementObject$1 == null) {
      $(a);
    } else {
      $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, undefined, $(1));
      $(a);
    }
  }
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(b)?.[$(`\$`)]?.($(1)) || $(b)?.[$(`\$`)]?.($(1));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = $(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpCalleeParam = tmpChainElementObject;
    const tmpCalleeParam$1 = tmpChainElementCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpCalleeParam, tmpCalleeParam$1, undefined, tmpCalleeParam$3);
    tmpIfTest = tmpChainElementCall$1;
  } else {
  }
} else {
}
if (tmpIfTest) {
  $(a);
} else {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = $(b);
  const tmpIfTest$5 = tmpChainElementCall$3 != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed$1 = $(`\$`);
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$7 = tmpChainElementObject$1 != null;
    if (tmpIfTest$7) {
      const tmpCalleeParam$5 = tmpChainElementObject$1;
      const tmpCalleeParam$7 = tmpChainElementCall$3;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$5 = $dotCall(tmpCalleeParam$5, tmpCalleeParam$7, undefined, tmpCalleeParam$9);
      $(a);
    } else {
      $(a);
    }
  } else {
    $(a);
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
    const i = $dotCall( f, c, undefined, h );
    a = i;
  }
}
const j = {
  a: 999,
  b: 1000,
};
if (a) {
  $( j );
}
else {
  const k = $( b );
  const l = k == null;
  if (l) {
    $( j );
  }
  else {
    const m = $( "$" );
    const n = k[ m ];
    const o = n == null;
    if (o) {
      $( j );
    }
    else {
      const p = $( 1 );
      $dotCall( n, k, undefined, p );
      $( j );
    }
  }
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
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
