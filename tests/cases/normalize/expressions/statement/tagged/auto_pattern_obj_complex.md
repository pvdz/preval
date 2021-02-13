# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > statement > tagged > auto_pattern_obj_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$`before ${$({ a: 1, b: 2 })} after`;
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = { a: 1, b: 2 };
const tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCalleeParam = ['before ', ' after'];
const tmpCalleeParam$2 = { a: 1, b: 2 };
const tmpCalleeParam$1 = $(tmpCalleeParam$2);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: ['before ', ' after'], { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same