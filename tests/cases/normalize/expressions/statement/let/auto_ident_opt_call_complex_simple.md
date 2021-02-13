# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > statement > let > auto_ident_opt_call_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($)?.(1);
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  xyz = tmpChainElementCall$1;
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpChainElementCall = $($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
  xyz = tmpChainElementCall$1;
}
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same