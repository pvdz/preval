# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Statement > Logic or left > Auto ident logic or simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
0 || 2 || $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
0 || 2 || $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = 0;
if (tmpIfTest) {
} else {
  tmpIfTest = 2;
  if (tmpIfTest) {
  } else {
    $(100);
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
