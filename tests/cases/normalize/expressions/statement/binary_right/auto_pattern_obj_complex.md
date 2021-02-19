# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > statement > binary_right > auto_pattern_obj_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$(100) + $({ a: 1, b: 2 });
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpBinBothLhs = $(100);
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpBinBothRhs = tmpCallCallee(tmpCalleeParam);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { a: 999, b: 1000 };
const a = bindingPatternObjRoot.a;
const tmpBinBothLhs = $(100);
const tmpCalleeParam = { a: 1, b: 2 };
const tmpBinBothRhs = $(tmpCalleeParam);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
