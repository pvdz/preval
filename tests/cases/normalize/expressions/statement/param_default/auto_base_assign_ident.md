# Preval test case

# auto_base_assign_ident.md

> normalize > expressions > statement > param_default > auto_base_assign_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(arg = (b = $(2))) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = $(2);
    b = tmpNestedComplexRhs;
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
    const tmpNestedComplexRhs = $(2);
    b = tmpNestedComplexRhs;
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
 - 1: 2
 - 2: undefined
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
