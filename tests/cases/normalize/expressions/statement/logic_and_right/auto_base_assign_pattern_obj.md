# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > logic_and_right > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$(100) && ({ b } = $({ b: $(2) }));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
  tmpAssignObjPatternRhs;
}
$(a, b);
`````

## Output

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpObjLitVal = $(2);
  const tmpCalleeParam = { b: tmpObjLitVal };
  const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
  b = tmpAssignObjPatternRhs.b;
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 2
 - 3: { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
