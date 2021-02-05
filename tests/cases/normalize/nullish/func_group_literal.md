# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)??foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  1;
  2;
  let y = 3;
  const tmpIfTest = y == null;
  if (tmpIfTest) {
    y = foo;
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let y = 3;
  const tmpIfTest = y == null;
  if (tmpIfTest) {
    y = foo;
  }
  const tmpReturnArg = $(y);
  return tmpReturnArg;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
