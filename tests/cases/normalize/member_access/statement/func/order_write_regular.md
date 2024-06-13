# Preval test case

# order_write_regular.md

> Normalize > Member access > Statement > Func > Order write regular
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
function f() {
  const obj = {
    get x() { return $(10); },
    set x(_) { $(20); },
  };

  $(obj).x = 30;
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
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
  $(obj).x = 30;
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
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
  const tmpAssignMemLhsObj = $(obj);
  tmpAssignMemLhsObj.x = 30;
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
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
const tmpAssignMemLhsObj = $(obj);
tmpAssignMemLhsObj.x = 30;
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  get x() {
    debugger;
    const b = $( 10 );
    return b;
  },
  set x( $$0 ) {
    debugger;
    $( 20 );
    return undefined;
  },
};
const c = $( a );
c.x = 30;
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 20
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
