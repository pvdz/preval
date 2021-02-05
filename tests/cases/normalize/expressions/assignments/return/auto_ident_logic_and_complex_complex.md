# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > assignments > return > auto_ident_logic_and_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = $($(1)) && $($(2)));
}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
function f() {
  let tmpReturnArg;
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
  }
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
