# Preval test case

# order_write_computed.md

> normalize > member_access > call_arg > order_write_computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$($(obj)[$('x')] = 30);
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
const varInitAssignLhsComputedObj = $(obj);
const varInitAssignLhsComputedProp = $('x');
const varInitAssignLhsComputedRhs = 30;
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = varInitAssignLhsComputedRhs;
const tmpCalleeParam = varInitAssignLhsComputedRhs;
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
const varInitAssignLhsComputedObj = $(obj);
const varInitAssignLhsComputedProp = $('x');
varInitAssignLhsComputedObj[varInitAssignLhsComputedProp] = 30;
$(30);
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