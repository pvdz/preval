# Preval test case

# auto_ident_func_id.md

> normalize > expressions > assignments > param_default > auto_ident_func_id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(arg = (a = function f() {})) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = function f() {};
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
  } else {
    arg = $tdz$__arg;
  }
}
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = function f() {};
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
  } else {
    arg = $tdz$__arg;
  }
}
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
