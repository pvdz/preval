# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  $('foo').length;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCompObj = $('foo');
  tmpCompObj.length;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpCompObj = $('foo');
  tmpCompObj.length;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 0: "foo"
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
