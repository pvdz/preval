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
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest$1 = tmpChainElementCall != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 = tmpChainElementObject != null;
  if (tmpIfTest$3) {
    const tmpCallCallee = $dotCall;
    const tmpCalleeParam = tmpChainElementObject;
    const tmpCalleeParam$1 = tmpChainElementCall;
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
    tmpIfTest = tmpChainElementCall$1;
  } else {
  }
} else {
}
if (tmpIfTest) {
} else {
  const tmpChainRootCall$1 = $;
  const tmpChainElementCall$3 = tmpChainRootCall$1(b);
  const tmpIfTest$5 = tmpChainElementCall$3 != null;
  if (tmpIfTest$5) {
    const tmpChainRootComputed$1 = $(`\$`);
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$7 = tmpChainElementObject$1 != null;
    if (tmpIfTest$7) {
      const tmpCallCallee$1 = $dotCall;
      const tmpCalleeParam$5 = tmpChainElementObject$1;
      const tmpCalleeParam$7 = tmpChainElementCall$3;
      const tmpCalleeParam$9 = $(1);
      const tmpChainElementCall$5 = tmpCallCallee$1(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
    } else {
    }
  } else {
  }
}
$(a);
`````

## Output


`````js filename=intro
let tmpIfTest = false;
const b /*:object*/ = { $: $ };
const tmpChainElementCall = $(b);
const tmpIfTest$1 /*:boolean*/ = tmpChainElementCall == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$3 /*:boolean*/ = tmpChainElementObject == null;
  if (tmpIfTest$3) {
  } else {
    const tmpCalleeParam$3 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$3);
    tmpIfTest = tmpChainElementCall$1;
  }
}
if (tmpIfTest) {
} else {
  const tmpChainElementCall$3 = $(b);
  const tmpIfTest$5 /*:boolean*/ = tmpChainElementCall$3 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpChainRootComputed$1 = $(`\$`);
    const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
    const tmpIfTest$7 /*:boolean*/ = tmpChainElementObject$1 == null;
    if (tmpIfTest$7) {
    } else {
      const tmpCalleeParam$9 = $(1);
      $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, tmpCalleeParam$9);
    }
  }
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = false;
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
    const i = $dotCall( f, c, h );
    a = i;
  }
}
if (a) {

}
else {
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
      $dotCall( m, j, o );
    }
  }
}
const p = {
  a: 999,
  b: 1000,
};
$( p );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
