# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > arr_element > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") + (a = "foo"));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpBinBothLhs;
a = 'foo';
tmpBinBothLhs = 'foo';
let tmpBinBothRhs;
a = 'foo';
tmpBinBothRhs = 'foo';
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothLhs;
a = 'foo';
tmpBinBothLhs = 'foo';
let tmpBinBothRhs;
a = 'foo';
tmpBinBothRhs = 'foo';
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'foofoo'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
