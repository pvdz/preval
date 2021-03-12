# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    void arg;
}
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      void arg;
    }
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
