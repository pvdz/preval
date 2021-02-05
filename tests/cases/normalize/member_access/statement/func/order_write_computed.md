# Preval test case

# order_write_computed.md

> normalize > member_access > statement > func > order_write_computed
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

  $(obj)[$('x')] = 30;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const obj = {
    get x() {
      const tmpReturnArg = $(10);
      return tmpReturnArg;
    },
    set x(_) {
      $(20);
    },
  };
  const tmpAssignComMemLhsObj = $(obj);
  const tmpAssignComMemLhsProp = $('x');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const obj = {
    get x() {
      const tmpReturnArg = $(10);
      return tmpReturnArg;
    },
    set x(_) {
      $(20);
    },
  };
  const tmpAssignComMemLhsObj = $(obj);
  const tmpAssignComMemLhsProp = $('x');
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = 30;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 'x'
 - 3: 20
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
