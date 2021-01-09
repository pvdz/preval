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
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpElement_1 = fdata.name;
tmpElement = [tmpElement_1, fdata];
tmpArg_1 = [tmpElement];
tmpObjPropValue = new Map(tmpArg_1);
tmpObjPropValue_1 = fdata.name;
const program = { modules: tmpObjPropValue, main: tmpObjPropValue_1 };
`````

## Uniformed

`````js filename=intro
var x;
var x;
x = x.x;
x = [x, x];
x = [x];
x = new x(x);
x = x.x;
var x = { x: x, x: x };
`````

## Output

`````js filename=intro
var tmpObjPropValue;
var tmpObjPropValue_1;
tmpElement_1 = fdata.name;
tmpElement = [tmpElement_1, fdata];
tmpArg_1 = [tmpElement];
tmpObjPropValue = new Map(tmpArg_1);
tmpObjPropValue_1 = fdata.name;
({ modules: tmpObjPropValue, main: tmpObjPropValue_1 });
`````
