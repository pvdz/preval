# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Statement > Arr element > Auto ident opt call simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) + $?.(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$?.(1) + $?.(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpBinBothLhs = tmpChainElementCall;
} else {
}
let tmpBinBothRhs = undefined;
const tmpChainRootCall$1 = $;
const tmpIfTest$1 = tmpChainRootCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  tmpBinBothRhs = tmpChainElementCall$1;
} else {
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpBinBothLhs = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
} else {
  const tmpChainElementCall = $(1);
  tmpBinBothLhs = tmpChainElementCall;
}
let tmpBinBothRhs = undefined;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
} else {
  const tmpChainElementCall$1 = $(1);
  tmpBinBothRhs = tmpChainElementCall$1;
}
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
let b = undefined;
const c = $ == null;
if (c) {

}
else {
  const d = $( 1 );
  b = d;
}
let e = undefined;
const f = $ == null;
if (f) {

}
else {
  const g = $( 1 );
  e = g;
}
b + e;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
