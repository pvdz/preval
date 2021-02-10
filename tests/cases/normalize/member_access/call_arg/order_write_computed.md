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
    return $(10);
  },
  set x(_) {
    $(20);
  },
};
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedAssignComMemberObj = $(obj);
const tmpNestedAssignComMemberProp = $('x');
const tmpNestedPropAssignRhs = 30;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpCalleeParam = tmpNestedPropAssignRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 20
 - 4: 30
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
