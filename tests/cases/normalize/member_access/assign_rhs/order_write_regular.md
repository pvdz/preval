# Preval test case

# order_write_regular.md

> normalize > member_access > assign_rhs > order_write_regular
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
x = $(obj).x = 30;
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
let x = 10;
const tmpNestedAssignObj = $(obj);
const tmpNestedPropAssignRhs = 30;
tmpNestedAssignObj.x = tmpNestedPropAssignRhs;
x = tmpNestedPropAssignRhs;
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
let x = 10;
const tmpNestedAssignObj = $(obj);
tmpNestedAssignObj.x = 30;
x = 30;
$(x);
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 20
 - 3: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same