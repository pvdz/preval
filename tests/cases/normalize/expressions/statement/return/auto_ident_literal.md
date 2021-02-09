# Preval test case

# auto_ident_literal.md

> normalize > expressions > statement > return > auto_ident_literal
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return "foo";
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  return 'foo';
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
tmpCallCallee('foo');
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
