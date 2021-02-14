# Preval test case

# auto_ident_func_id.md

> normalize > expressions > assignments > label > auto_ident_func_id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
label: a = function f() {};
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = function f() {};
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  a = function f() {};
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
