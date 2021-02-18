# Preval test case

# prop.md

> normalize > object > prop
>
> Property with sequence value

#TODO

## Input

`````js filename=intro
const fdata = {name: 1};
let tmpElement_1 = 2;
let tmpElement, tmpArg_1;
const program = {
  modules: ((tmpElement_1 = fdata.name), (tmpElement = [tmpElement_1, fdata]), (tmpArg_1 = [tmpElement]), new Map(tmpArg_1)),
  main: fdata.name,
};
`````

## Normalized

`````js filename=intro
const fdata = { name: 1 };
let tmpElement_1 = 2;
let tmpElement;
let tmpArg_1;
tmpElement_1 = fdata.name;
tmpElement = [tmpElement_1, fdata];
tmpArg_1 = [tmpElement];
const tmpObjLitVal = new Map(tmpArg_1);
const tmpObjLitVal$1 = fdata.name;
const program = { modules: tmpObjLitVal, main: tmpObjLitVal$1 };
`````

## Output

`````js filename=intro
const fdata = { name: 1 };
const SSA_tmpElement_1 = fdata.name;
const tmpElement = [SSA_tmpElement_1, fdata];
const tmpArg_1 = [tmpElement];
new Map(tmpArg_1);
fdata.name;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
