# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $?.(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$($(100) + (a = $?.(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
let a = undefined;
let tmpCalleeParam = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
  tmpCalleeParam = tmpBinBothLhs + undefined;
  $(tmpCalleeParam);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  tmpCalleeParam = tmpBinBothLhs + tmpChainElementCall;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
let b = undefined;
let c = undefined;
const d = $ == null;
if (d) {
  c = a + undefined;
  $( c );
}
else {
  const e = $( 1 );
  b = e;
  c = a + e;
  $( c );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 101
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
