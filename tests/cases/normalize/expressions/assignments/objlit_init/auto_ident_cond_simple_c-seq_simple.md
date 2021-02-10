# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > assignments > objlit_init > auto_ident_cond_simple_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = 1 ? (40, 50, $(60)) : $($(100))) });
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpObjLitVal;
let tmpNestedComplexRhs = undefined;
{
  tmpNestedComplexRhs = $(60);
}
a = tmpNestedComplexRhs;
tmpObjLitVal = tmpNestedComplexRhs;
const tmpCalleeParam = { x: tmpObjLitVal };
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 60
 - 2: { x: '60' }
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
