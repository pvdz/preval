# Preval test case

# simple_complex.md

> logical > and > simple_complex
>
> Logical ops need to be normalized

#TODO

## Input

`````js filename=intro
var x;
$(x = 1 && $(2));
`````

## Normalized

`````js filename=intro
var x;
const tmpCallCallee = $;
let tmpCalleeParam;
let tmpNestedComplexRhs = 1;
if (tmpNestedComplexRhs) {
  tmpNestedComplexRhs = $(2);
}
x = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
