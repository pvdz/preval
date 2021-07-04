# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = $?.(1);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = $?.(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = undefined;
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
const tmpIfTest = $ == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall = $(1);
  $(tmpChainElementCall);
}
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
