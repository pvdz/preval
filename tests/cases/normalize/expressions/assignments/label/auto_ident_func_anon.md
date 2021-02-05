# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > assignments > label > auto_ident_func_anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = function () {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = function () {};
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function () {};
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
