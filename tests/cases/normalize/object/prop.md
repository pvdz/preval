# Preval test case

# prop.md

> Normalize > Object > Prop
>
> Property with sequence value

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

## Pre Normal


`````js filename=intro
const fdata = { name: 1 };
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
let tmpElement = undefined;
let tmpArg_1 = undefined;
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
const tmpClusterSSA_tmpElement = [1, fdata];
const tmpClusterSSA_tmpArg_1 = [tmpClusterSSA_tmpElement];
new Map(tmpClusterSSA_tmpArg_1);
fdata.name;
`````

## PST Output

With rename=true

`````js filename=intro
const a = { name: 1 };
const b = [ 1, a ];
const c = [ b ];
new Map( c );
a.name;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
