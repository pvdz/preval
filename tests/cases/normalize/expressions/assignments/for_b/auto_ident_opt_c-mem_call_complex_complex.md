# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident opt c-mem call complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = $(b)?.[$("$")]?.($(1))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = $(b)?.[$(`\$`)]?.($(1)))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  a = undefined;
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
      const tmpCalleeParam$3 = undefined;
      const tmpCalleeParam$5 = $(1);
      const tmpChainElementCall$1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
      a = tmpChainElementCall$1;
    } else {
    }
  } else {
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = undefined;
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
    a = tmpChainElementCall$1;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpChainElementCall$2 /*:unknown*/ = $(b);
    const tmpIfTest$2 /*:boolean*/ = tmpChainElementCall$2 == null;
    if (tmpIfTest$2) {
    } else {
      const tmpChainRootComputed$1 /*:unknown*/ = $(`\$`);
      const tmpChainElementObject$1 /*:unknown*/ = tmpChainElementCall$2[tmpChainRootComputed$1];
      const tmpIfTest$4 /*:boolean*/ = tmpChainElementObject$1 == null;
      if (tmpIfTest$4) {
      } else {
        const tmpCalleeParam$1 /*:unknown*/ = $(1);
        const tmpChainElementCall$4 /*:unknown*/ = $dotCall(tmpChainElementObject$1, tmpChainElementCall$2, undefined, tmpCalleeParam$1);
        a = tmpChainElementCall$4;
      }
    }
    if (a) {
    } else {
      break;
    }
  }
} else {
}
$(a);
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
    const i = $dotCall( f, c, undefined, h );
    a = i;
  }
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
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
        const p = $dotCall( m, j, undefined, o );
        a = p;
      }
    }
    if (a) {

    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: { $: '"<$>"' }
 - 12: '$'
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: { $: '"<$>"' }
 - 17: '$'
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
