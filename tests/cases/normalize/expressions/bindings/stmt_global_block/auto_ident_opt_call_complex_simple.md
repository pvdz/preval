# Preval test case

# auto_ident_opt_call_complex_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_opt_call_complex_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $($)?.(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpChainElementCall = tmpChainRootCall($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainElementCall.call(tmpChainRootCall, 1);
    a = tmpChainElementCall$1;
  }
  $(a);
}
`````

## Output

`````js filename=intro
{
  let a = undefined;
  const tmpChainElementCall = $($);
  const tmpIfTest = tmpChainElementCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall$1 = tmpChainElementCall.call($, 1);
    a = tmpChainElementCall$1;
  }
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
