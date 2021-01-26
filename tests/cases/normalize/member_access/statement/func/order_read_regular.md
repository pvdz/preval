# Preval test case

# order_read_regular.md

> normalize > member_access > statement > func > order_read_regular
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

  $(obj).x;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const obj = {
    get x() {
      let tmpReturnArg = $(10);
      return tmpReturnArg;
    },
    set x(_) {
      $(20);
    },
  };
  const tmpCompObj = $(obj);
  tmpCompObj.x;
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
      let tmpReturnArg = $(10);
      return tmpReturnArg;
    },
    set x(_) {
      $(20);
    },
  };
  const tmpCompObj = $(obj);
  tmpCompObj.x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: 10
 - 2: null
 - 3: undefined

Normalized calls: Same

Final output calls: Same
