# Preval test case

# auto_ident_unary_excl_simple.md

> normalize > expressions > statement > return > auto_ident_unary_excl_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f() {
  return !arg;
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = !arg;
  return tmpReturnArg;
}
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
function f() {
  const tmpReturnArg = !arg;
  return tmpReturnArg;
}
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: false
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
