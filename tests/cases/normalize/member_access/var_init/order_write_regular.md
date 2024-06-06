# Preval test case

# order_write_regular.md

> Normalize > Member access > Var init > Order write regular
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = $(obj).x = 30;
$(x);
`````

## Pre Normal


`````js filename=intro
const obj = {
  get x() {
    debugger;
    return $(10);
  },
  set x($$0) {
    let _ = $$0;
    debugger;
    $(20);
  },
};
let x = ($(obj).x = 30);
$(x);
`````

## Normalized


`````js filename=intro
const obj = {
  get x() {
    debugger;
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    let _ = $$0;
    debugger;
    $(20);
    return undefined;
  },
};
const varInitAssignLhsComputedObj = $(obj);
const varInitAssignLhsComputedRhs = 30;
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let x = varInitAssignLhsComputedRhs;
$(x);
`````

## Output


`````js filename=intro
const obj = {
  get x() {
    debugger;
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    debugger;
    $(20);
    return undefined;
  },
};
const varInitAssignLhsComputedObj = $(obj);
varInitAssignLhsComputedObj.x = 30;
$(30);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
get x() {
    debugger;
    const b = $( 10 );
    return b;
  },,
set x( $$0 ) {
    debugger;
    $( 20 );
    return undefined;
  },
;
const c = $( a );
c.x = 30;
$( 30 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 20
 - 3: 30
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
