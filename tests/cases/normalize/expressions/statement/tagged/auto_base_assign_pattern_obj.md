# Preval test case

# auto_base_assign_pattern_obj.md

> normalize > expressions > statement > tagged > auto_base_assign_pattern_obj
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = {};

let a = { a: 999, b: 1000 };
$`before ${({ b } = $({ b: $(2) }))} after`;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = {};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1;
const tmpCallCallee$1 = $;
const tmpObjLitVal = $(2);
const tmpCalleeParam$2 = { b: tmpObjLitVal };
const tmpNestedAssignObjPatternRhs = tmpCallCallee$1(tmpCalleeParam$2);
b = tmpNestedAssignObjPatternRhs.b;
tmpCalleeParam$1 = tmpNestedAssignObjPatternRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
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
 - 3: ['before ', ' after'], { b: '2' }
 - 4: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
