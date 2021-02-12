# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > assignments > binary_both > auto_ident_opt_call_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

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
if (tmpChainRootCall) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
}
let tmpBinBothLhs = a;
a = undefined;
const tmpChainRootCall$1 = $;
if (tmpChainRootCall$1) {
  const tmpChainElementCall$1 = tmpChainRootCall$1(1);
  a = tmpChainElementCall$1;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
if ($) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
}
let tmpBinBothLhs = a;
a = undefined;
if ($) {
  const tmpChainElementCall$1 = $(1);
  a = tmpChainElementCall$1;
}
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
