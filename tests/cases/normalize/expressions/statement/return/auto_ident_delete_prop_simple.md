# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > statement > return > auto_ident_delete_prop_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return delete x.y;
}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = delete x.y;
  return tmpReturnArg;
}
let x = { y: 1 };
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
function f() {
  const tmpReturnArg = delete x.y;
  return tmpReturnArg;
}
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: true
 - 2: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
