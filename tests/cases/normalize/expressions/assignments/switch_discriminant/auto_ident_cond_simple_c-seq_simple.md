# Preval test case

# auto_ident_cond_simple_c-seq_simple.md

> normalize > expressions > assignments > switch_discriminant > auto_ident_cond_simple_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = 1 ? (40, 50, $(60)) : $($(100)))) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
let tmpNestedComplexRhs = undefined;
{
  tmpNestedComplexRhs = $(60);
}
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
let a = { a: 999, b: 1000 };
let tmpSwitchTest;
let tmpNestedComplexRhs = undefined;
tmpNestedComplexRhs = $(60);
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

## Result

Should call `$` with:
 - 1: 60
 - 2: 100
 - 3: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
