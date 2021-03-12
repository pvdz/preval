# Preval test case

# auto_this.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto this
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ((a = this)) {
  default:
    $(100);
}
$(a);

//*/// (end of file artifact)
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
a = this;
let tmpSwitchTest = a;
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const SSA_a = this;
$(100);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
