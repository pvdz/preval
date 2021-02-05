# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > assignments > switch_default > auto_ident_delete_prop_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = delete x.y;
}
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
{
  let tmpFallthrough = false;
  {
    ('default case:');
    a = delete x.y;
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
a = delete x.y;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
