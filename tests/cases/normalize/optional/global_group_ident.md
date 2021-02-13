# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
const a = {x: 1}
const y = (1, a)?.x
$(y);
`````

## Normalized

`````js filename=intro
const a = { x: 1 };
let y = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  y = tmpChainElementObject;
}
$(y);
`````

## Output

`````js filename=intro
const a = { x: 1 };
let y = undefined;
const tmpIfTest = a != null;
if (tmpIfTest) {
  const tmpChainElementObject = a.x;
  y = tmpChainElementObject;
}
$(y);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
