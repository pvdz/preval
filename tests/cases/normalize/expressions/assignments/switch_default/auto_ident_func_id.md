# Preval test case

# auto_ident_func_id.md

> normalize > expressions > assignments > switch_default > auto_ident_func_id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = function f() {};
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    ('default case:');
    a = function f() {};
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
a = function f() {};
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
