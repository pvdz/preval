# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_opt_call_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = $($)?.(1);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    ('default case:');
    a = undefined;
    const tmpChainRootCall = $;
    const tmpChainElementCall = tmpChainRootCall($);
    if (tmpChainElementCall) {
      const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
      a = tmpChainElementCall$1;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
a = undefined;
const tmpChainRootCall = $;
const tmpChainElementCall = tmpChainRootCall($);
if (tmpChainElementCall) {
  const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
  a = tmpChainElementCall$1;
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
