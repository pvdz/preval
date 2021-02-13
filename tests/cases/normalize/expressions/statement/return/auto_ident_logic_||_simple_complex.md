# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > statement > return > auto_ident_logic_||_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return 0 || $($(1));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg = 0;
  if (tmpReturnArg) {
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  }
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg = 0;
  if (tmpReturnArg) {
  } else {
    const tmpCalleeParam = $(1);
    tmpReturnArg = $(tmpCalleeParam);
  }
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same