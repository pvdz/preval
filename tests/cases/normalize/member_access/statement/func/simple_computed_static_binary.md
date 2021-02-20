# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Statement > Func > Simple computed static binary
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
  const tmpCompProp = 'foo';
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
  obj.foo;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
