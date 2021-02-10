# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > statement > logic_or_right > auto_pattern_obj_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(100) || $({ a: 1, b: 2 });
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpIfTest = $(100);
if (tmpIfTest) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
