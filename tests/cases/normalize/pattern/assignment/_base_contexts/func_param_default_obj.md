# Preval test case

# func_param_default_obj.md

> Normalize > Pattern > Assignment > Base contexts > Func param default obj
>
> Testing simple pattern normalizations

#TODO: arrow

## Input

`````js filename=intro
const f = (a = { x } = 1) => { return a };
`````

## Normalized

`````js filename=intro
const f = (tmpParamDefault) => {
  let a = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpNestedAssignObjPatternRhs = 1;
    x = tmpNestedAssignObjPatternRhs.x;
    a = tmpNestedAssignObjPatternRhs;
    return a;
  } else {
    a = tmpParamDefault;
    return a;
  }
};
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
