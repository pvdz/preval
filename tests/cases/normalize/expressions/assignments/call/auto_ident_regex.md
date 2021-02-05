# Preval test case

# auto_ident_regex.md

> normalize > expressions > assignments > call > auto_ident_regex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = /foo/));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
const tmpNestedComplexRhs = /foo/;
a = tmpNestedComplexRhs;
tmpCalleeParam = tmpNestedComplexRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam;
a = /foo/;
tmpCalleeParam = /foo/;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
