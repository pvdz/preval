# Preval test case

# auto_ident_opt_c-mem_call_complex_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident opt c-mem call complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = $(b)?.[$("$")]?.($(1))) {}
$(f());
$(a);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? $(b)?.[$(`\$`)]?.($(1)) : tmpParamBare;
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    p = undefined;
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
        p = tmpChainElementCall$1;
        return undefined;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } else {
    p = tmpParamBare;
    return undefined;
  }
};
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$7 = f();
tmpCallCallee$1(tmpCalleeParam$7);
$(a);
`````

## Output


`````js filename=intro
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
    $dotCall(tmpChainElementObject, tmpChainElementCall, undefined, tmpCalleeParam$5);
  }
}
$(undefined);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b == null;
if (c) {

}
else {
  const d = $( "$" );
  const e = b[ d ];
  const f = e == null;
  if (f) {

  }
  else {
    const g = $( 1 );
    $dotCall( e, b, undefined, g );
  }
}
$( undefined );
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 1
 - 5: undefined
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
