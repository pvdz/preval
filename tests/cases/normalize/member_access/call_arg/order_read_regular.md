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
    let tmpReturnArg = $(10);
    return tmpReturnArg;
  },
  set x(_) {
    $(20);
  },
};
const tmpCallCallee = $;
const tmpBindingInit = $(obj);
const tmpCalleeParam = tmpBindingInit.x;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
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
const tmpBindingInit = $(obj);
const tmpCalleeParam = tmpBindingInit.x;
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: 10
 - 2: 10
 - 3: undefined

Normalized calls: Same

Final output calls: Same
