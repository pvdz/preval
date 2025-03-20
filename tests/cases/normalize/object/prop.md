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
const fdata /*:object*/ = { name: 1 };
const tmpClusterSSA_tmpElement /*:array*/ = [1, fdata];
const tmpClusterSSA_tmpArg_1 /*:array*/ = [tmpClusterSSA_tmpElement];
new Map(tmpClusterSSA_tmpArg_1);
fdata.name;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const fdata = { name: 1 };
const tmpClusterSSA_tmpElement = [1, fdata];
const tmpClusterSSA_tmpArg_1 = [tmpClusterSSA_tmpElement];
new Map(tmpClusterSSA_tmpArg_1);
fdata.name;
`````


## PST Settled
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


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
