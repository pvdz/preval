# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_array_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = [1, 2, 3])) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
const tmpNestedComplexRhs = [1, 2, 3];
a = tmpNestedComplexRhs;
tmpSwitchTest = tmpNestedComplexRhs;
tmpSwitchBreak: {
  let tmpFallthrough = false;
  {
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
