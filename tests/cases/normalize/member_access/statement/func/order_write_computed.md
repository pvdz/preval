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
      let tmpReturnArg = $(10);
      return tmpReturnArg;
    },
    set x(_) {
      $(20);
    },
  };
  $(obj)[$('x')] = 30;
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
  $(obj)[$('x')] = 30;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: {"x":10}
 - 1: "x"
 - 2: 20
 - 3: null
 - 4: undefined

Normalized calls: Same

Final output calls: Same
