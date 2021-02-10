# Preval test case

# auto_ident_upd_pi_complex.md

> normalize > expressions > statement > let > auto_ident_upd_pi_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
let xyz = ++$($(b)).x;
$(xyz);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
let xyz;
const tmpCallCallee = $;
const tmpCalleeParam = $(b);
const tmpNestedAssignObj = tmpCallCallee(tmpCalleeParam);
const tmpBinLhs = tmpNestedAssignObj.x;
const tmpNestedPropCompoundComplexRhs = tmpBinLhs + 1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
xyz = tmpNestedPropCompoundComplexRhs;
$(xyz);
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 2
 - 4: { a: '999', b: '1000' }, { x: '2' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
