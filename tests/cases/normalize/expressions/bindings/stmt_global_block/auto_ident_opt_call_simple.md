# Preval test case

# auto_ident_opt_call_simple.md

> normalize > expressions > bindings > stmt_global_block > auto_ident_opt_call_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $?.(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = undefined;
  const tmpChainRootCall = $;
  const tmpIfTest = tmpChainRootCall != null;
  if (tmpIfTest) {
    const tmpChainElementCall = tmpChainRootCall(1);
    a = tmpChainElementCall;
  }
  $(a);
}
`````

## Output

`````js filename=intro
{
  let a = undefined;
  const tmpIfTest = $ != null;
  if (tmpIfTest) {
    const tmpChainElementCall = $(1);
    a = tmpChainElementCall;
  }
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
