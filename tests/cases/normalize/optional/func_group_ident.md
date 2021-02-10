# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
function f() {
  const a = {x: 1}
  const y = (1, a)?.x
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const a = { x: 1 };
  let y = undefined;
  const tmpChainRootProp = a;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.x;
    y = tmpChainElementObject;
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
