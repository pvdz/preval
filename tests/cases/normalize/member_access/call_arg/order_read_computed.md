# Preval test case

# order_read_computed.md

> normalize > member_access > call_arg > order_read_computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
const obj = {
  get x() { return $(10); },
  set x(_) { $(20); },
};

$($(obj)[$('x')]);
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
const tmpCompObj = $(obj);
const tmpCompProp = $('x');
const tmpCalleeParam = tmpCompObj[tmpCompProp];
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
 - 3: 10
 - 4: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
