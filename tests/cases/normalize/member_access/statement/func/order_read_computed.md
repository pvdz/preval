# Preval test case

# order_read_computed.md

> Normalize > Member access > Statement > Func > Order read computed
>
> Test evaluation order of member expression through getters and setters

## Input

`````js filename=intro
function f() {
  const obj = {
    get x() { return $(10); },
    set x(_) { $(20); },
  };

  $(obj)[$('x')];
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
  $(obj)[$(`x`)];
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
  const tmpCompObj = $(obj);
  const tmpCompProp = $(`x`);
  tmpCompObj[tmpCompProp];
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const obj /*:object*/ = {
  get x() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(10);
    return tmpReturnArg;
  },
  set x($$0) {
    debugger;
    $(20);
    return undefined;
  },
};
const tmpCompObj /*:unknown*/ = $(obj);
const tmpCompProp /*:unknown*/ = $(`x`);
tmpCompObj[tmpCompProp];
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
const d = $( "x" );
c[ d ];
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 10
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
