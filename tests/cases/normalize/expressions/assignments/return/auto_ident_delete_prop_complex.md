# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > assignments > return > auto_ident_delete_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
function f() {
  return (a = delete $(arg).y);
}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f() {
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
function f() {
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpReturnArg = a;
  return tmpReturnArg;
}
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
