# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident opt call simple
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

## Pre Normal

`````js filename=intro
{
  let a = $?.(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpChainRootCall = $;
const tmpIfTest = tmpChainRootCall != null;
if (tmpIfTest) {
  const tmpChainElementCall = tmpChainRootCall(1);
  a = tmpChainElementCall;
} else {
}
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpIfTest = $ != null;
if (tmpIfTest) {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
} else {
}
$(a);
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
