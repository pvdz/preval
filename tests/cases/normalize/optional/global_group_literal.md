# Preval test case

# global_group_literal.md

> Normalize > Optional > Global group literal
>
> We shouldn't transform member expressions on group ending in a literal

## Input

`````js filename=intro
const y = (1, 2, 3)?.foo
$(y);
`````

## Pre Normal


`````js filename=intro
const y = (1, 2, 3)?.foo;
$(y);
`````

## Normalized


`````js filename=intro
let y = undefined;
const tmpChainRootProp = 3;
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
const tmpChainElementObject /*:unknown*/ = (3).foo;
$(tmpChainElementObject);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 3.foo;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
