# Preval test case

# auto_ident_opt_call_complex_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident opt call complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + $($)?.(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) + $($)?.(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
const tmpIfTest = tmpChainElementCall != null;
if (tmpIfTest) {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, tmpChainRootCall, 1);
  tmpBinBothRhs = tmpChainElementCall$1;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(100);
let tmpBinBothRhs = undefined;
const tmpChainElementCall = $($);
const tmpIfTest = tmpChainElementCall == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall$1 = $dotCall(tmpChainElementCall, $, 1);
  tmpBinBothRhs = tmpChainElementCall$1;
}
tmpBinBothLhs + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
const c = $( $ );
const d = c == null;
if (d) {

}
else {
  const e = $dotCall( c, $, 1 );
  b = e;
}
a + b;
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
