# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$((a = $(b)?.[$("$")]?.($(1))) + (a = $(b)?.[$("$")]?.($(1))));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$((a = $(b)?.[$(`\$`)]?.($(1))) + (a = $(b)?.[$(`\$`)]?.($(1))));
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $dotCall;
    const tmpCalleeParam$1 = tmpChainElementObject;
    const tmpCalleeParam$3 = tmpChainElementCall;
    const tmpCalleeParam$5 = $(1);
    const tmpChainElementCall$1 = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
    a = tmpChainElementCall$1;
  } else {
  }
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$3 = tmpChainRootCall$1(b);
const tmpIfTest$3 = tmpChainElementCall$3 != null;
if (tmpIfTest$3) {
  const tmpChainRootComputed$1 = $(`\$`);
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 = tmpChainElementObject$1 != null;
  if (tmpIfTest$5) {
    const tmpCallCallee$3 = $dotCall;
    const tmpCalleeParam$7 = tmpChainElementObject$1;
    const tmpCalleeParam$9 = tmpChainElementCall$3;
    const tmpCalleeParam$11 = $(1);
    const tmpChainElementCall$5 = tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9, tmpCalleeParam$11);
    a = tmpChainElementCall$5;
  } else {
  }
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
let a = undefined;
const b = { $: $ };
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`\$`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  const tmpIfTest$1 = tmpChainElementObject == null;
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$5 = $(1);
    const tmpChainElementCall$1 = $dotCall(tmpChainElementObject, tmpChainElementCall, tmpCalleeParam$5);
    a = tmpChainElementCall$1;
  }
}
const tmpBinBothLhs = a;
let tmpClusterSSA_a = undefined;
const tmpChainElementCall$3 = $(b);
const tmpIfTest$3 = tmpChainElementCall$3 == null;
if (tmpIfTest$3) {
} else {
  const tmpChainRootComputed$1 = $(`\$`);
  const tmpChainElementObject$1 = tmpChainElementCall$3[tmpChainRootComputed$1];
  const tmpIfTest$5 = tmpChainElementObject$1 == null;
  if (tmpIfTest$5) {
  } else {
    const tmpCalleeParam$11 = $(1);
    const tmpChainElementCall$5 = $dotCall(tmpChainElementObject$1, tmpChainElementCall$3, tmpCalleeParam$11);
    tmpClusterSSA_a = tmpChainElementCall$5;
  }
}
const tmpCalleeParam = tmpBinBothLhs + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

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
    const i = $dotCall( f, c, h );
    a = i;
  }
}
const j = a;
let k = undefined;
const l = $( b );
const m = l == null;
if (m) {

}
else {
  const n = $( "$" );
  const o = l[ n ];
  const p = o == null;
  if (p) {

  }
  else {
    const q = $( 1 );
    const r = $dotCall( o, l, q );
    k = r;
  }
}
const s = j + k;
$( s );
$( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 1
 - 9: 2
 - 10: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
