# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
const y = (1, 2, 3)?.foo
$(y);
`````

## Normalized

`````js filename=intro
let y = undefined;
1;
2;
const tmpChainRootProp = 3;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  y = tmpChainElementObject;
}
$(y);
`````

## Output

`````js filename=intro
let y = undefined;
const tmpChainElementObject = (3).foo;
y = tmpChainElementObject;
$(y);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
