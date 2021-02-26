# Preval test case

# group_literal.md

> Normalize > Member access > Statement > Func > Group literal
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
let f = function () {
  $(1);
  const tmpCompObj = 2;
  tmpCompObj.foo;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  (2).foo;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
