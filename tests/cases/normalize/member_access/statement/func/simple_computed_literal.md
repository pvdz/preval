# Preval test case

# simple_computed_literal.md

> Normalize > Member access > Statement > Func > Simple computed literal
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
function f() {
  const obj = {foo: 10};
  obj['foo'];
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const obj = { foo: 10 };
  obj.foo;
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
