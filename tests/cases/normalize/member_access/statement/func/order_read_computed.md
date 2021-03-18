# Preval test case

# order_read_computed.md

> Normalize > Member access > Statement > Func > Order read computed
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

  $(obj)[$('x')];
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  const obj = {
    get x() {
      return $(10);
    },
    set x(_) {
      $(20);
    },
  };
  $(obj)[$('x')];
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const obj = {
    get x() {
      const tmpReturnArg = $(10);
      return tmpReturnArg;
    },
    set x(_) {
      $(20);
    },
  };
  const tmpCompObj = $(obj);
  const tmpCompProp = $('x');
  tmpCompObj[tmpCompProp];
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const obj = {
  get x() {
    const tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x(_) {
    $(20);
  },
};
const tmpCompObj = $(obj);
const tmpCompProp = $('x');
tmpCompObj[tmpCompProp];
$(undefined);
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
