# Preval test case

# assignment_reg_prop.md

> Expr order > Assignment reg prop
>
> Object evals before rhs

## Input

`````js filename=intro
let b = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};

$(b).c = $(2);
`````

## Pre Normal


`````js filename=intro
let b = {
  get c() {
    debugger;
    $(`get`);
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`set`);
  },
};
$(b).c = $(2);
`````

## Normalized


`````js filename=intro
let b = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    let x = $$0;
    debugger;
    $(`set`);
    return undefined;
  },
};
const tmpAssignMemLhsObj = $(b);
const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj$1.c = tmpAssignMemRhs;
`````

## Output


`````js filename=intro
const b = {
  get c() {
    debugger;
    $(`get`);
    return undefined;
  },
  set c($$0) {
    debugger;
    $(`set`);
    return undefined;
  },
};
const tmpAssignMemLhsObj = $(b);
const tmpAssignMemRhs = $(2);
tmpAssignMemLhsObj.c = tmpAssignMemRhs;
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  get c() {
    debugger;
    $( "get" );
    return undefined;
  },
  set c( $$0 ) {
    debugger;
    $( "set" );
    return undefined;
  },
};
const b = $( a );
const c = $( 2 );
b.c = c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '<get/set>' }
 - 2: 2
 - 3: 'set'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
