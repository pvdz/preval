# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = ~arg);
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f() {
  a = ~arg;
  let tmpReturnArg = a;
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
  a = -2;
  const tmpReturnArg = a;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2
 - 2: -2, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
