# Preval test case

# auto_ident_c-opt_complex_complex.md

> Normalize > Expressions > Statement > Arr element > Auto ident c-opt complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$(b)?.[$("x")] + $(b)?.[$("x")];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$(b)?.[$(`x`)] + $(b)?.[$(`x`)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall(b);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpBinBothLhs = tmpChainElementObject;
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpChainElementCall$1 = tmpChainRootCall$1(b);
const tmpIfTest$1 = tmpChainElementCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainRootComputed$1 = $(`x`);
  const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
  tmpBinBothRhs = tmpChainElementObject$1;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { x: 1 };
const a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainElementCall = $(b);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainRootComputed = $(`x`);
  const tmpChainElementObject = tmpChainElementCall[tmpChainRootComputed];
  tmpBinBothLhs = tmpChainElementObject;
}
let tmpBinBothRhs = undefined;
const tmpChainElementCall$1 = $(b);
const tmpIfTest$1 = tmpChainElementCall$1 == null;
if (tmpIfTest$1) {
} else {
  const tmpChainRootComputed$1 = $(`x`);
  const tmpChainElementObject$1 = tmpChainElementCall$1[tmpChainRootComputed$1];
  tmpBinBothRhs = tmpChainElementObject$1;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 1 };
const b = {
a: 999,
b: 1000
;
let c = undefined;
const d = $( a );
const e = d == null;
if (e) {

}
else {
  const f = $( "x" );
  const g = d[ f ];
  c = g;
}
let h = undefined;
const i = $( a );
const j = i == null;
if (j) {

}
else {
  const k = $( "x" );
  const l = i[ k ];
  h = l;
}
c + h;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 'x'
 - 3: { x: '1' }
 - 4: 'x'
 - 5: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
