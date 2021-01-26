# Preval test case

# order_write_computed.md

> normalize > member_access > statement > global > order_write_computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$(obj)[$('x')] = 30;
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
$(obj)[$('x')] = 30;
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
$(obj)[$('x')] = 30;
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: 20
 - 3: undefined

Normalized calls: Same

Final output calls: Same
