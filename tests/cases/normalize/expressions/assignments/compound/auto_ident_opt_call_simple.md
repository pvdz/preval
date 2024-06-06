# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $?.(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
let tmpBinBothRhs = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  tmpBinBothRhs = tmpChainElementCall;
} else {
}
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $ == null;
let tmpClusterSSA_a = NaN;
if (tmpIfTest) {
  a ** 0;
  $(NaN);
} else {
  const tmpChainElementCall = $(1);
  tmpClusterSSA_a = a * tmpChainElementCall;
  $(tmpClusterSSA_a);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $ == null;
let c = NaN;
if (b) {
  a ** 0;
  $( NaN );
}
else {
  const d = $( 1 );
  c = a * d;
  $( c );
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: NaN
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
