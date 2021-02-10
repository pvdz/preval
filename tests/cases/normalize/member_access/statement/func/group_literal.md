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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
