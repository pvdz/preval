# Preval test case

# auto_ident_cond_simple_complex_simple.md

> normalize > expressions > assignments > binary_left > auto_ident_cond_simple_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = 1 ? $(2) : $($(100))) + $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
let tmpNestedComplexRhs = undefined;
{
  tmpNestedComplexRhs = $(2);
}
a = tmpNestedComplexRhs;
tmpBinBothLhs = tmpNestedComplexRhs;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 102
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
