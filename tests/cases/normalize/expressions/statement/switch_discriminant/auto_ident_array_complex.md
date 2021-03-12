# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ([$(1), 2, $(3)]) {
  default:
    $(100);
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
const tmpSwitchTest = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(3);
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
