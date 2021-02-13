# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > statement > logic_and_left > auto_ident_logic_or_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
(0 || 2) && $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 0;
if (tmpIfTest) {
} else {
  tmpIfTest = 2;
}
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 0;
if (tmpIfTest) {
} else {
  tmpIfTest = 2;
}
if (tmpIfTest) {
  $(100);
}
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same