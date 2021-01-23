# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let z = 1; }
const {x: {y: {z}}} = 1;
{ let z = 1; }
`````

## Normalized

`````js filename=intro
{
  let z_1 = 1;
}
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const z = objPatternNoDefault$1.z;
{
  let z_2 = 1;
}
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
objPatternNoDefault$1.z;
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
