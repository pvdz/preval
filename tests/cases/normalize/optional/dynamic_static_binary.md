# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj?.['fo' + 'o']);
`````

## Normalized

`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = obj;
if (tmpChainRootProp) {
  const tmpChainRootComputed = 'fo' + 'o';
  const tmpChainElementObject = tmpChainRootProp[tmpChainRootComputed];
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
