# Preval test case

# order_read_regular.md

> normalize > member_access > assign_rhs > order_read_regular
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
x = $(obj).x;
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
let x = 10;
const tmpAssignRhsProp = $(obj);
x = tmpAssignRhsProp.x;
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 10
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
