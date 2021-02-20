# Preval test case

# _base_opt_call_undef_opt_prop.md

> Normalize > Optional > Base opt call undef opt prop
>
> Simple example

#TODO

## Input

`````js filename=intro
var a = undefined;
$(a?.b?.());
`````

## Normalized

`````js filename=intro
var a;
a = undefined;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpIfTest$1 = tmpChainElementObject != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject.call(tmpChainRootProp);
    tmpCalleeParam = tmpChainElementCall;
  }
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
