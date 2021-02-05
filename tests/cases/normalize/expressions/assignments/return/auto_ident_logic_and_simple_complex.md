# Preval test case

# auto_ident_logic_and_simple_complex.md

> normalize > expressions > assignments > return > auto_ident_logic_and_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = 1 && $($(1)));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs = 1;
  if (tmpNestedComplexRhs) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  }
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs = 1;
  if (tmpNestedComplexRhs) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  }
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
