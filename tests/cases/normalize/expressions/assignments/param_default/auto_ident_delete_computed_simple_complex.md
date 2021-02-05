# Preval test case

# auto_ident_delete_computed_simple_complex.md

> normalize > expressions > assignments > param_default > auto_ident_delete_computed_simple_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
function f(arg = (a = delete x[$("y")])) {}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpDeleteCompObj = x;
    const tmpDeleteCompProp = $('y');
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
  } else {
    arg = $tdz$__arg;
  }
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
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpDeleteCompObj = x;
    const tmpDeleteCompProp = $('y');
    const tmpNestedComplexRhs = delete tmpDeleteCompObj[tmpDeleteCompProp];
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
  } else {
    arg = $tdz$__arg;
  }
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
 - 1: 'y'
 - 2: undefined
 - 3: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
