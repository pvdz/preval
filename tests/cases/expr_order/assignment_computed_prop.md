# Preval test case

# assignment_computed_prop.md

> Expr order > Assignment computed prop
>
> The object is evaluated before the computed property

## Input

`````js filename=intro
let b = {
  get c()  { $('get'); }, 
  set c(x) { $('set'); },
};

$(b)[$('c')] = $(3);
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
$(b)[$(`c`)] = $(3);
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
const tmpAssignComMemLhsObj = $(b);
const tmpAssignComMemLhsProp = $(`c`);
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(3);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
`````

## Output


`````js filename=intro
const b /*:object*/ = {
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
const tmpAssignComMemLhsObj /*:unknown*/ = $(b);
const tmpAssignComMemLhsProp /*:unknown*/ = $(`c`);
const tmpAssignComputedRhs /*:unknown*/ = $(3);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
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
const c = $( "c" );
const d = $( 3 );
b[c] = d;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '<get/set>' }
 - 2: 'c'
 - 3: 3
 - 4: 'set'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
