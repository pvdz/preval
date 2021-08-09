# Preval test case

# auto_ident_call_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Switch discriminant > Auto ident call computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
switch ((1, 2, b)["$"](1)) {
  default:
    $(100);
}
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (1, 2, b)[`\$`](1);
  if (true) {
    $(100);
  } else {
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = b;
const tmpSwitchDisc = tmpCallObj.$(1);
$(100);
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
b.$(1);
$(100);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
