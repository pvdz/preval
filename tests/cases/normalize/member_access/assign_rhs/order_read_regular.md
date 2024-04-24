# Preval test case

# order_read_regular.md

> Normalize > Member access > Assign rhs > Order read regular
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
x = $(obj).x;
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
x = $(obj).x;
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
const tmpAssignRhsProp = $(obj);
x = tmpAssignRhsProp.x;
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
const tmpAssignRhsProp = $(obj);
const tmpSSA_x = tmpAssignRhsProp.x;
$(tmpSSA_x);
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
const d = c.x;
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 10
 - 3: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
