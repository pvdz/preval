# Preval test case

# order_read_computed.md

> Normalize > Member access > Assign rhs > Order read computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = 10;
x = $(obj)[$('x')];
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
let x = 10;
x = $(obj)[$('x')];
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
let x = 10;
const tmpAssignRhsCompObj = $(obj);
const tmpAssignRhsCompProp = $('x');
x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
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
const tmpAssignRhsCompObj = $(obj);
const tmpAssignRhsCompProp = $('x');
const tmpSSA_x = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
$(tmpSSA_x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 10
 - 4: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
