# Preval test case

# order_read_regular.md

> normalize > member_access > call_arg > order_read_regular
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$($(obj).x);
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
const tmpCompObj = $(obj);
const tmpCalleeParam = tmpCompObj.x;
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
const tmpCallCallee = $;
const tmpCompObj = $(obj);
const tmpCalleeParam = tmpCompObj.x;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 10
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
