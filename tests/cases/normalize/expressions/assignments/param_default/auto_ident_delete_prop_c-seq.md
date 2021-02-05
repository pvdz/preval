# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > assignments > param_default > auto_ident_delete_prop_c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
function f(arg = (a = delete ($(1), $(2), $(x)).y)) {}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteObj = $(x);
    const tmpNestedComplexRhs = delete tmpDeleteObj.y;
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
    $(1);
    $(2);
    const tmpDeleteObj = $(x);
    const tmpNestedComplexRhs = delete tmpDeleteObj.y;
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
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: undefined
 - 5: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
