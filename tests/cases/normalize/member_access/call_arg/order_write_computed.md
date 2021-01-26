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
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
const obj = {
  get x() {
    let tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x(_) {
    $(20);
  },
};
const tmpCallCallee = $;
tmpAssignMemLhsObj = $(obj);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
const tmpCalleeParam = 30;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpAssignMemLhsObj;
const obj = {
  get x() {
    let tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x(_) {
    $(20);
  },
};
const tmpCallCallee = $;
tmpAssignMemLhsObj = $(obj);
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x');
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
tmpCallCallee(30);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: 20
 - 3: 30
 - 4: undefined

Normalized calls: Same

Final output calls: Same
