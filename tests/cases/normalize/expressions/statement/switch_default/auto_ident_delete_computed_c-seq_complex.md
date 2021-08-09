# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Switch default > Auto ident delete computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    delete ($(1), $(2), $(arg))[$("y")];
}
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    delete ($(1), $(2), $(arg))[$(`y`)];
  } else {
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
delete tmpDeleteCompObj[tmpDeleteCompProp];
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
$(1);
$(1);
$(2);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
delete tmpDeleteCompObj[tmpDeleteCompProp];
$(a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
