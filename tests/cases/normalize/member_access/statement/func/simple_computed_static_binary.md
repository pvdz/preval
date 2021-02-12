# Preval test case

# dynamic_static.md

> normalize > member_access > dynamic_static
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj['fo' + 'o'];
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCompProp = 'fo' + 'o';
  tmpCompObj[tmpCompProp];
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const obj = { foo: 10 };
  const tmpCompObj = obj;
  const tmpCompProp = 'fo' + 'o';
  tmpCompObj[tmpCompProp];
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
