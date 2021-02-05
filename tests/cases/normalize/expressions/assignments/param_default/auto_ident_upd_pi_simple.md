# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > assignments > param_default > auto_ident_upd_pi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(arg = (a = ++b)) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs;
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs + 1;
    b = tmpNestedComplexRhs$1;
    tmpNestedComplexRhs = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
  } else {
    arg = $tdz$__arg;
  }
}
let b = 1;
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    let tmpNestedComplexRhs;
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs + 1;
    b = tmpNestedComplexRhs$1;
    tmpNestedComplexRhs = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
  } else {
    arg = $tdz$__arg;
  }
}
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
