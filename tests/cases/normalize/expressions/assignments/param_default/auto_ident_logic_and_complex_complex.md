# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > assignments > param_default > auto_ident_logic_and_complex_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($(1)) && $($(2)))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(1);
    let tmpNestedComplexRhs = tmpCallCallee(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
      const tmpCallCallee$1 = $;
      const tmpCalleeParam$1 = $(2);
      tmpNestedComplexRhs = tmpCallCallee$1(tmpCalleeParam$1);
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let a = { a: 999, b: 1000 };
const tmpCallCallee$2 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$2(tmpCalleeParam$2);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = $(1);
    let tmpNestedComplexRhs = $(tmpCalleeParam);
    if (tmpNestedComplexRhs) {
      const tmpCalleeParam$1 = $(2);
      tmpNestedComplexRhs = $(tmpCalleeParam$1);
    }
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
  }
}
let a = { a: 999, b: 1000 };
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: undefined
 - 6: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same