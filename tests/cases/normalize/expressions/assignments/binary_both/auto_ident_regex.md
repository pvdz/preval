# Preval test case

# auto_ident_regex.md

> normalize > expressions > assignments > binary_both > auto_ident_regex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/) + (a = /foo/));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = /foo/;
let tmpBinBothLhs = a;
a = /foo/;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
let tmpBinBothLhs = a;
a = /foo/;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: '/foo//foo/'
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same