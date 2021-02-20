# Preval test case

# order_read_computed.md

> Normalize > Member access > Var init > Order read computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = $(obj)[$('x')];
$(x);
`````

## Normalized

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
let x = tmpCompObj[tmpCompProp];
$(x);
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
const x = tmpCompObj[tmpCompProp];
$(x);
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

Normalized calls: Same

Final output calls: Same
