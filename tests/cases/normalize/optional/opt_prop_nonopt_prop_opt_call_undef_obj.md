# Preval test case

# opt_prop_nonopt_prop_opt_call_undef_obj.md

> Normalize > Optional > Opt prop nonopt prop opt call undef obj
>
> Make sure this works properly

#TODO

## Input

`````js filename=intro
const a = undefined;
a?.b.c?.(1);
`````

## Normalized

`````js filename=intro
const a = undefined;
const tmpChainRootProp = a;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.b;
  const tmpChainElementObject$1 = tmpChainElementObject.c;
  const tmpIfTest$1 = tmpChainElementObject$1 != null;
  if (tmpIfTest$1) {
    const tmpChainElementCall = tmpChainElementObject$1.call(tmpChainElementObject, 1);
  }
}
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
