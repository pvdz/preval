# Preval test case

# order_write_computed.md

> normalize > member_access > var_init > order_write_computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = $(obj)[$('x')] = 30;
$(x);
`````

## Normalized

`````js filename=intro
const obj = {
  get x() {
    return $(10);
  },
  set x(_) {
    $(20);
  },
};
let x;
const tmpNestedAssignComMemberObj = $(obj);
const tmpNestedAssignComMemberProp = $('x');
const tmpNestedPropAssignRhs = 30;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
x = tmpNestedPropAssignRhs;
$(x);
`````

## Output

`````js filename=intro
const obj = {
  get x() {
    return $(10);
  },
  set x(_) {
    $(20);
  },
};
let x;
const tmpNestedAssignComMemberObj = $(obj);
const tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = 30;
x = 30;
$(x);
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 20
 - 4: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
