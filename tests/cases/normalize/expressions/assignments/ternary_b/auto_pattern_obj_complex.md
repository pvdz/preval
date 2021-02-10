# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > assignments > ternary_b > auto_pattern_obj_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$($(1) ? ({ a } = $({ a: 1, b: 2 })) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = { a: 1, b: 2 };
  const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$1);
  a = tmpNestedAssignObjPatternRhs.a;
  tmpCalleeParam = tmpNestedAssignObjPatternRhs;
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '1', b: '2' }
 - 3: { a: '1', b: '2' }
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
