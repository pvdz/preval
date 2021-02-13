# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > statement > logic_or_left > auto_pattern_obj_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) || $(100);
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same