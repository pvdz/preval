# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Switch default > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    b++;
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = $(1);
  if (true) {
    b++;
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpSwitchDisc = $(1);
const tmpPostUpdArgIdent = b;
b = b + 1;
$(a, b);
`````

## Output

`````js filename=intro
$(1);
const a = { a: 999, b: 1000 };
$(a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
