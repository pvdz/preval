# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > assignments > return > auto_base_assign_pattern_obj
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
function f() {
  return (a = { b } = $({ b: $(2) }));
}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
function f() {
  let tmpReturnArg;
  let tmpNestedComplexRhs;
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpNestedAssignObjPatternRhs.b;
  tmpNestedComplexRhs = tmpNestedAssignObjPatternRhs;
  a = tmpNestedComplexRhs;
  tmpReturnArg = tmpNestedComplexRhs;
  return tmpReturnArg;
}
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: { b: '2' }
 - 3: { b: '2' }
 - 4: { b: '2' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
