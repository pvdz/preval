# Preval test case

# auto_ident_regex.md

> normalize > expressions > assignments > label > auto_ident_regex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = /foo/;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = /foo/;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
