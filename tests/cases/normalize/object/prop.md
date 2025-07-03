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


## Settled


`````js filename=intro
const fdata /*:object*/ /*truthy*/ = { name: 1 };
const tmpElement /*:array*/ /*truthy*/ = [1, fdata];
const tmpArg_1 /*:array*/ /*truthy*/ = [tmpElement];
new $map_constructor(tmpArg_1);
fdata.name;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const fdata = { name: 1 };
const tmpElement = [1, fdata];
const tmpArg_1 = [tmpElement];
new $map_constructor(tmpArg_1);
fdata.name;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { name: 1 };
const b = [ 1, a ];
const c = [ b ];
new $map_constructor( c );
a.name;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const fdata = { name: 1 };
let tmpElement_1 = 2;
let tmpElement = undefined;
let tmpArg_1 = undefined;
tmpElement_1 = fdata.name;
tmpElement = [tmpElement_1, fdata];
tmpArg_1 = [tmpElement];
const tmpObjLitVal = new $map_constructor(tmpArg_1);
const tmpObjLitVal$1 = fdata.name;
const program = { modules: tmpObjLitVal, main: tmpObjLitVal$1 };
`````


## Todos triggered


- (todo) array reads var statement with init NewExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
