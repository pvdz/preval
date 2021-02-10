# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > statement > call_spread > auto_ident_opt_call_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...$($)?.(1));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  tmpCalleeParamSpread = tmpChainElementCall$1;
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
