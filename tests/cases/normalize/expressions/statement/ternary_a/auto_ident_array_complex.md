# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > statement > ternary_a > auto_ident_array_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[$(1), 2, $(3)] ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
const tmpIfTest = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const tmpIfTest = [tmpArrElement, 2, tmpArrElement$2];
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same