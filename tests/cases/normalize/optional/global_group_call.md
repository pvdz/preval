# Preval test case

# global_group_call.md

> Normalize > Optional > Global group call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
const y = (1, 2, $())?.foo
$(y);
`````

## Pre Normal

`````js filename=intro
const y = (1, 2, $())?.foo;
$(y);
`````

## Normalized

`````js filename=intro
let y = undefined;
const tmpChainRootProp = $();
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  y = tmpChainElementObject;
} else {
}
$(y);
`````

## Output

`````js filename=intro
let y = undefined;
const tmpChainRootProp = $();
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  y = tmpChainElementObject;
} else {
}
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
