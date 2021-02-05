# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > param_default > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
function f(arg = ({ b } = $({ b: $(2) }))) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    arg = tmpNestedAssignObjPatternRhs;
  } else {
    arg = $tdz$__arg;
  }
}
let b = {};
let a = { a: 999, b: 1000 };
('<hoisted func decl `f`>');
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
function f($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = $(2);
    const tmpCalleeParam = { b: tmpObjLitVal };
    const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
    b = tmpNestedAssignObjPatternRhs.b;
    arg = tmpNestedAssignObjPatternRhs;
  } else {
    arg = $tdz$__arg;
  }
}
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: undefined
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
