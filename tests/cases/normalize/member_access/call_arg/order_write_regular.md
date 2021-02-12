# Preval test case

# order_write_regular.md

> normalize > member_access > call_arg > order_write_regular
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$($(obj).x = 30);
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
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignObj = $(obj);
const tmpNestedPropAssignRhs = 30;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
tmpCalleeParam = tmpNestedPropAssignRhs;
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
let tmpCalleeParam;
const tmpNestedAssignObj = $(obj);
tmpNestedAssignObj.x = 30;
tmpCalleeParam = 30;
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 20
 - 3: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
