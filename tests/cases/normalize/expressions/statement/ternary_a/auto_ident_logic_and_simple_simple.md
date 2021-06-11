# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Ternary a > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
1 && 2 ? $(100) : $(200);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
1 && 2 ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 1;
if (tmpIfTest) {
  tmpIfTest = 2;
  if (tmpIfTest) {
    $(100);
  } else {
    $(200);
  }
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
