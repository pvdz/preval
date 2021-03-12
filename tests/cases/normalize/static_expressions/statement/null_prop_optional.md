# Preval test case

# null_prop_optional.md

> Normalize > Static expressions > Statement > Null prop optional
>
> Optional property access on null/undefined should drop the remainder of the chain

#TODO

## Input

`````js filename=intro
$(null?.foo);
$('okay, do not DCE');
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = null;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.foo;
  tmpCalleeParam = tmpChainElementObject;
}
tmpCallCallee(tmpCalleeParam);
$('okay, do not DCE');
`````

## Output

`````js filename=intro
$(undefined);
$('okay, do not DCE');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 'okay, do not DCE'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same