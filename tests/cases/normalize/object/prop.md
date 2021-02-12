# Preval test case

# prop.md

> normalize > object > prop
>
> Property with sequence value

#TODO

## Input

`````js filename=intro
const program = {
  modules: ((tmpElement_1 = fdata.name), (tmpElement = [tmpElement_1, fdata]), (tmpArg_1 = [tmpElement]), new Map(tmpArg_1)),
  main: fdata.name,
};
`````

## Normalized

`````js filename=intro
tmpElement_1 = fdata.name;
tmpElement = [tmpElement_1, fdata];
tmpArg_1 = [tmpElement];
const tmpObjLitVal = new Map(tmpArg_1);
const tmpObjLitVal$1 = fdata.name;
const program = { modules: tmpObjLitVal, main: tmpObjLitVal$1 };
`````

## Output

`````js filename=intro
tmpElement_1 = fdata.name;
tmpElement = [tmpElement_1, fdata];
tmpArg_1 = [tmpElement];
const tmpObjLitVal = new Map(tmpArg_1);
const tmpObjLitVal$1 = fdata.name;
const program = { modules: tmpObjLitVal, main: tmpObjLitVal$1 };
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
