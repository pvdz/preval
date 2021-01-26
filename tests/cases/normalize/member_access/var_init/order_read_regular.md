# Preval test case

# order_read_regular.md

> normalize > member_access > var_init > order_read_regular
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

let x = $(obj).x;
$(x);
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
const tmpBindingInit = $(obj);
let x = tmpBindingInit.x;
$(x);
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
const tmpBindingInit = $(obj);
let x = tmpBindingInit.x;
$(x);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: 10
 - 2: 10
 - 3: undefined

Normalized calls: Same

Final output calls: Same
