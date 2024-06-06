# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + (a = $?.(1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $?.(1)) + (a = $?.(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
const tmpIfTest$1 = tmpChainRootCall$1 != null;
if (tmpIfTest$1) {
  const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  a = tmpChainElementCall$1;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpIfTest = $ == null;
let tmpBinBothLhs = undefined;
if (tmpIfTest) {
} else {
  const tmpChainElementCall = $(1);
  tmpBinBothLhs = tmpChainElementCall;
}
let tmpClusterSSA_a = undefined;
const tmpIfTest$1 = $ == null;
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpCalleeParam = tmpBinBothLhs + undefined;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  const tmpChainElementCall$1 = $(1);
  tmpClusterSSA_a = tmpChainElementCall$1;
  const tmpClusterSSA_tmpCalleeParam$1 = tmpBinBothLhs + tmpChainElementCall$1;
  $(tmpClusterSSA_tmpCalleeParam$1);
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ == null;
let b = undefined;
if (a) {

}
else {
  const c = $( 1 );
  b = c;
}
let d = undefined;
const e = $ == null;
if (e) {
  const f = b + undefined;
  $( f );
}
else {
  const g = $( 1 );
  d = g;
  const h = b + g;
  $( h );
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
