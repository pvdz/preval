# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > statement > logic_or_right > auto_ident_opt_call_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) || $($)?.(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  if (tmpChainElementCall) {
    const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  if (tmpChainElementCall) {
    tmpChainElementCall.call(tmpChainRootCall, 1);
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
