# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > return > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = "foo");
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  a = 'foo';
  tmpReturnArg = 'foo';
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  a = 'foo';
  tmpReturnArg = 'foo';
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foo'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
