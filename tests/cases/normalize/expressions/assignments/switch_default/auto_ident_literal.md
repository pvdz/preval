# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > switch_default > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = "foo";
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpSwitchTest = $(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    a = 'foo';
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    ('default case:');
    a = 'foo';
  }
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
