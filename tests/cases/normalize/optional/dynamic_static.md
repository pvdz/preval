# Preval test case

# dynamic_static.md

> Normalize > Optional > Dynamic static
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.['foo']);
`````

## Pre Normal

`````js filename=intro
const obj = { foo: 10 };
$(obj?.[`foo`]);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainRootComputed = `foo`;
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
} else {
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const obj = { foo: 10 };
const tmpIfTest = obj == null;
if (tmpIfTest) {
  $(undefined);
} else {
  const tmpChainElementObject = obj.foo;
  $(tmpChainElementObject);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
