# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Throw > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $?.(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = $?.(1));
$(a);
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
let tmpThrowArg = a;
throw tmpThrowArg;
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
const tmpThrowArg = a;
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
