# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = delete ($(1), $(2), arg)[$("y")];
}
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  const tmpSwitchValue = $(1);
  let tmpSwitchCaseToStart = 0;
  tmpSwitchBreak: {
    if (tmpSwitchCaseToStart <= 0) {
      a = delete ($(1), $(2), arg)[$('y')];
    }
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchValue = $(1);
let tmpSwitchCaseToStart = 0;
const tmpIfTest = tmpSwitchCaseToStart <= 0;
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $('y');
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
} else {
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
$(1);
$(1);
$(2);
const tmpDeleteCompProp = $('y');
const a = delete arg[tmpDeleteCompProp];
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 'y'
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
