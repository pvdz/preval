# Preval test case

# order_read_computed.md

> normalize > member_access > statement > func > order_read_computed
>
> Test evaluation order of member expression through getters and setters

#TODO

## Input

`````js filename=intro
function f() {
  const obj = {
    get x() { return $(10); },
    set x(_) { $(20); },
  };

  $(obj)[$('x')];
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
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
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
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
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
