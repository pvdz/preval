# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)?.foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let y = undefined;
  1;
  2;
  const tmpChainRootProp = 3;
  if (tmpChainRootProp) {
    const tmpChainElementObject = tmpChainRootProp.foo;
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
function f() {
  let y = undefined;
  const tmpChainElementObject = (3).foo;
  y = tmpChainElementObject;
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
