# Preval test case

# auto_ident_opt_call_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident opt call simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $?.(1));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = $?.(1));
$(xyz);
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
let xyz = a;
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
const tmpIfTest = $ == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementCall = $(1);
  a = tmpChainElementCall;
  $(tmpChainElementCall);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
