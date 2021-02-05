# Preval test case

# auto_ident_func_anon.md

> normalize > expressions > assignments > switch_default > auto_ident_func_anon
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = function () {};
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
    a = function () {};
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
a = function () {};
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
