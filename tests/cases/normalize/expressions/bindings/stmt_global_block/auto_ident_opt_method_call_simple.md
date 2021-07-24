# Preval test case

# auto_ident_opt_method_call_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident opt method call simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = { c: $ };

  let a = b?.c(1);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let b = { c: $ };
  let a = b?.c(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let b = { c: $ };
let a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.c;
  const tmpChainElementCall = $dotCall(tmpChainElementObject, tmpChainRootProp, 1);
  a = tmpChainElementCall;
} else {
}
$(a);
`````

## Output

`````js filename=intro
const b = { c: $ };
const tmpChainElementCall = $dotCall($, b, 1);
$(tmpChainElementCall);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
