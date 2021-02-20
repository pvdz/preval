# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

#TODO: arrow

## Input

`````js filename=intro
const f = (a = [ x ] = [100]) => { return $(a) };
f();
`````

## Normalized

`````js filename=intro
const f = ($tdz$__a) => {
  let a = undefined;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    const tmpNestedAssignArrPatternRhs = [100];
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
  } else {
    a = $tdz$__a;
  }
  const tmpReturnArg = $(a);
  return tmpReturnArg;
};
f();
`````

## Output

`````js filename=intro
const f = ($tdz$__a) => {
  let a = undefined;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    const tmpNestedAssignArrPatternRhs = [100];
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
  } else {
    a = $tdz$__a;
  }
  const tmpReturnArg = $(a);
  return tmpReturnArg;
};
f();
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
