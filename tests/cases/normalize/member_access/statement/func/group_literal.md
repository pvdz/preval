# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  ($(1), 2).foo;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  const tmpCompObj = 2;
  tmpCompObj.foo;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(1);
  (2).foo;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
