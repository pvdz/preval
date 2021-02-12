# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > stmt > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = (b.x, c).foo;
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = { x: 2 };
  let c = 3;
  b.x;
  const tmpCompObj = c;
  let a = tmpCompObj.foo;
  $(a, b, c);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let b = { x: 2 };
  let c = 3;
  b.x;
  const tmpCompObj = c;
  let a = tmpCompObj.foo;
  $(a, b, c);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined, { x: '2' }, 3
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
