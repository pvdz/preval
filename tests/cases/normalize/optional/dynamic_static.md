# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.['foo']);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
if (tmpChainRootProp) {
  const tmpChainRootComputed = 'foo';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
if (tmpChainRootProp) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
