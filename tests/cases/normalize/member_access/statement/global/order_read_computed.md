# Preval test case

# order_read_computed.md

> normalize > member_access > statement > global > order_read_computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$(obj)[$('x')];
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
const tmpCompObj = $(obj);
const tmpCompProp = $('x');
tmpCompObj[tmpCompProp];
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
const tmpCompObj = $(obj);
const tmpCompProp = $('x');
tmpCompObj[tmpCompProp];
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
