# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$('foo'?.length);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = 'foo';
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.length;
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
const tmpChainElementObject = 'foo'.length;
tmpCalleeParam = tmpChainElementObject;
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
