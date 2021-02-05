# Preval test case

# order_write_regular.md

> normalize > member_access > statement > func > order_write_regular
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

  $(obj).x = 30;
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
  const tmpAssignMemLhsObj = $(obj);
  tmpAssignMemLhsObj.x = 30;
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
  const tmpAssignMemLhsObj = $(obj);
  tmpAssignMemLhsObj.x = 30;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: { x: '<get/set>' }
 - 2: 20
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
